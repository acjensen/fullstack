#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { CpuArchitecture, OperatingSystemFamily } from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import 'source-map-support/register';
import root from '../root';
import { appSettings } from './common';

const {
  account, appName, region, tableName, domainName,
} = appSettings;

const app = new cdk.App();

const stack = new cdk.Stack(app, `${appName}-stack`, {
  env: {
    account,
    region,
  },
});

const table = new dynamodb.TableV2(stack, `${appName}-table`, {
  tableName,
  partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
});

const vpc = new ec2.Vpc(stack, `${appName}-vpc`, {
  vpcName: `${appName}-vpc`,
  natGateways: 0,
  enableDnsHostnames: true,
  enableDnsSupport: true,
  maxAzs: 2,
  subnetConfiguration: [
    {
      mapPublicIpOnLaunch: true,
      cidrMask: 24,
      name: 'public-one',
      subnetType: ec2.SubnetType.PUBLIC,
    },
  ],
});

// Create a load-balanced Fargate service and make it public
const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
  stack,
  `${appName}-service`,
  {
    serviceName: `${appName}-service`,
    cpu: 256, // .25 vCPU (default)
    memoryLimitMiB: 512, // .5 GB (default)
    vpc, // Needed since we're not using NAT gateway
    loadBalancer: new ApplicationLoadBalancer(
      stack,
      `${appName}-service-load-balancer`,
      {
        vpc,
        securityGroup: new ec2.SecurityGroup(
          stack,
          `${appName}-service-security-group`,
          {
            vpc,
            securityGroupName: `${appName}-service-security-group`,
          },
        ),
        internetFacing: true,
      },
    ), // Needed since we're not using NAT gateway
    desiredCount: 1, // 1 (default)
    taskImageOptions: {
      containerName: `${appName}-container`,
      image: ecs.ContainerImage.fromDockerImageAsset(
        new DockerImageAsset(stack, `${appName}-image-asset`, {
          directory: root,
          buildSecrets: {
            AUTH_SECRET: `env=${process.env.AUTH_SECRET!}`,
          },
          buildArgs: {
            NEXTAUTH_URL_ARG: `https://${domainName}/api/auth`,
          },
        }),
      ),
      containerPort: 80,
      enableLogging: true,
    },
    protocol: ApplicationProtocol.HTTPS,
    domainName,
    domainZone: HostedZone.fromLookup(stack, `${appName}-hosted-zone`, {
      domainName,
    }),
    redirectHTTP: true,
    assignPublicIp: true, // Needed since we're not using NAT gateway
    publicLoadBalancer: true, // Default is true
    runtimePlatform: {
      cpuArchitecture: CpuArchitecture.ARM64,
      operatingSystemFamily: OperatingSystemFamily.LINUX,
    },
    // healthCheck: {
    //   command: ["CMD-SHELL", "curl -f http://localhost/health || exit 1"],
    // },
  },
);

table.grantReadWriteData(service.taskDefinition.taskRole);
service.targetGroup.configureHealthCheck({
  path: '/ping',
  // Below settings help decrease deployment time
  interval: cdk.Duration.seconds(5),
  healthyThresholdCount: 2,
  timeout: cdk.Duration.seconds(3),
});
// Speed up container deployments.
// Ref: https://github.com/aws/aws-cdk/issues/4599
// Ref: https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/load-balancer-connection-draining.html
// Note: Do not set the value to 5 seconds when you have a service with long-lived requests,
// such as slow file uploads or streaming connections.
// Todo: replace taskImageOptions with taskDefinition
// so we can set stopTimeout in container definition,
// which will reduce deployment times.
service.targetGroup.setAttribute('deregistration_delay.timeout_seconds', '10');

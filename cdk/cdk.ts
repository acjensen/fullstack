#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
// import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
// import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as logs from "aws-cdk-lib/aws-logs";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import path from "path";
import { ApplicationProtocol } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { CpuArchitecture, OperatingSystemFamily } from "aws-cdk-lib/aws-ecs";
const app = new cdk.App();

const stack = new cdk.Stack(app, "forums-stack", {
  env: {
    account: "525122308447",
    region: "us-east-1",
  },
});

const table = new dynamodb.TableV2(stack, "forums-table", {
  partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
});

// Create a load-balanced Fargate service and make it public
const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
  stack,
  "forums-service",
  {
    cluster: new ecs.Cluster(stack, "forums-cluster", {
      vpc: new ec2.Vpc(stack, "forums-vpc", {
        maxAzs: 3, // Default is all AZs in region
      }),
    }),
    cpu: 256, // .25 vCPU (default)
    memoryLimitMiB: 512, // .5 GB (default)
    desiredCount: 1, // 1 (default)
    taskImageOptions: {
      containerName: `forums-container`,
      image: ecs.ContainerImage.fromDockerImageAsset(
        new DockerImageAsset(stack, "forums-image-asset", {
          directory: path.join(__dirname, "../../"),
        })
      ),
      // environment: containerEnvs,
      containerPort: 80,
      enableLogging: true,
      // taskRole: role,
    },
    protocol: ApplicationProtocol.HTTPS,
    domainName: "acjensen-desktop.com",
    domainZone: HostedZone.fromLookup(stack, "forums-hosted-zone", {
      domainName: "acjensen-desktop.com",
    }),
    redirectHTTP: true,
    publicLoadBalancer: true, // Default is true
    runtimePlatform: {
      cpuArchitecture: CpuArchitecture.ARM64,
      operatingSystemFamily: OperatingSystemFamily.LINUX,
    },
  }
);

// service.taskDefinition.addContainer("forums-container", {
//   image: ecs.ContainerImage.fromRegistry("nginx:latest"),
//   // logging: ecs.LogDriver.awsLogs({
//   //   streamPrefix: "demoLogs",
//   //   logGroup: new logs.LogGroup(stack, "ContainerLogGroup", {
//   //     retention: logs.RetentionDays.ONE_YEAR,
//   //     removalPolicy: cdk.RemovalPolicy.DESTROY,
//   //   }),
//   // }),
//   linuxParameters: new ecs.LinuxParameters(stack, "NodeExec", {
//     initProcessEnabled: true,
//   }),
// });

"use server";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
// import STS, { AssumeRoleRequest } from "aws-sdk/clients/sts";
import { tableName } from "../cdk/common";

export async function getData() {
  const res = await fetch("https://httpbin.org/get");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export const put = async () => {
  console.log("put ON THE SERVER");
  const client = new DynamoDBClient({ region: process.env.REGION });

  client
    .send(
      new UpdateItemCommand({
        TableName: "fullstack",
        Key: { pk: { S: "test" } },
      })
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get = async (): Promise<string> => {
  console.log("get ON THE SERVER");
  const client = new DynamoDBClient({ region: process.env.REGION });

  let result: string = "sdf";
  const callback = (error: any, data: any) => {};
  await client
    .send(
      new GetItemCommand({
        TableName: tableName,
        Key: { pk: { S: "test" } },
      })
    )
    .then((response) => {
      console.log(response.Item);
      console.log(response.Item!.pk!.S!);
      result = response.Item!.pk!.S!;
    })
    .catch((error) => {
      console.log(error, error.stack);
      result = "ERROR";
    });

  return result;
};

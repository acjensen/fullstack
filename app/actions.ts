"use server";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { fullStackAppSettings } from "../cdk/common";

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

  let result: string = "sdf";
  client
    .send(
      new UpdateItemCommand({
        TableName: fullStackAppSettings.tableName,
        Key: { pk: { S: "test" } },
      })
    )
    .then((response) => {
      console.log(response);
      result = "SUCCESS";
    })
    .catch((error) => {
      console.log(error);
      result = "ERROR";
    });
  return result;
};

export const get = async (): Promise<string> => {
  console.log("get ON THE SERVER");
  const client = new DynamoDBClient({ region: process.env.REGION });

  let result: string = "sdf";
  const callback = (error: any, data: any) => {};
  await client
    .send(
      new GetItemCommand({
        TableName: fullStackAppSettings.tableName,
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
      // result = error.stack; // for debugging purposes
      result = "ERROR";
    });

  return result;
};

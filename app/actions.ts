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

export const put = async (
  id: string,
  attribute: { name: string; value: string }
) => {
  const client = new DynamoDBClient({ region: process.env.REGION });

  const result = await client.send(
    new UpdateItemCommand({
      TableName: fullStackAppSettings.tableName,
      Key: { pk: { S: id } },
      UpdateExpression: `set ${attribute.name} = :attributeName`,
      ExpressionAttributeValues: {
        ":attributeName": { S: attribute.value },
      },
      // ReturnValues: "ALL_NEW",
    })
  );
  return JSON.stringify(result).toString();
  //   .then((response) => {
  //     console.log(response);
  //     result = "SUCCESS";
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     result = "ERROR";
  //   });
  // return result;
};

export const get = async (id: string): Promise<any> => {
  const client = new DynamoDBClient({ region: process.env.REGION });

  let result: any = "";
  const callback = (error: any, data: any) => {};
  await client
    .send(
      new GetItemCommand({
        TableName: fullStackAppSettings.tableName,
        Key: { pk: { S: id } },
      })
    )
    .then((response) => {
      console.log(response.Item);
      console.log(response.Item!);
      result = response.Item!;
    })
    .catch((error) => {
      console.log(error, error.stack);
      // result = error.stack; // for local debugging purposes
      result = undefined;
    });

  return result;
};

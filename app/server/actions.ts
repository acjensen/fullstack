"use server";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { appSettings } from "../../cdk/common";

export const put = async (
  id: string,
  attribute: { name: string; value: string }
) => {
  const client = new DynamoDBClient({ region: process.env.REGION });

  const result = await client.send(
    new UpdateItemCommand({
      TableName: appSettings.tableName,
      Key: { pk: { S: id } },
      UpdateExpression: `set ${attribute.name} = :attributeName`,
      ExpressionAttributeValues: {
        ":attributeName": { S: attribute.value },
      },
      // ReturnValues: "ALL_NEW",
    })
  );
  return JSON.stringify(result).toString();
};

export const get = async (id: string): Promise<any> => {
  const client = new DynamoDBClient({ region: process.env.REGION });

  let result: any = "";
  const callback = (error: any, data: any) => {};
  await client
    .send(
      new GetItemCommand({
        TableName: appSettings.tableName,
        Key: { pk: { S: id } },
      })
    )
    .then((response) => {
      result = response.Item!;
    })
    .catch((error) => {
      // result = error.stack; // for local debugging purposes
      result = undefined;
    });

  return result;
};

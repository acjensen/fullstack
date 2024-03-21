"use server";
import DynamoDB, {
  GetItemInput,
  UpdateItemInput,
} from "aws-sdk/clients/dynamodb";
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
  const client = new DynamoDB({ region: "us-east-1" });

  const params: UpdateItemInput = {
    TableName: "fullstack-stack-fullstacktableE10A93B1-1M75IKHDBDX6U",
    Key: { pk: { S: "test" } },
  };

  client.updateItem(params, (error, data) => {
    if (error) console.log(error, error.stack);
    else console.log(data);
  });
};

export const get = async (): Promise<string> => {
  console.log("get ON THE SERVER");
  const client = new DynamoDB({ region: "us-east-1" });

  const params: GetItemInput = {
    TableName: tableName,
    Key: { pk: { S: "test" } },
    // ExpressionAttributeNames: { '#N': 'name', '#E': 'email' },
    // ExpressionAttributeValues: { ':n': { S: 'newName' } },
    // UpdateExpression: 'SET #N = :n',
    // ConditionExpression: 'attribute_exists(#E)',
    // ReturnValues: 'ALL_NEW',
  };

  let result: string = "sdf";
  const callback = (error: any, data: any) => {};
  // const request: Request<DynamoDB.Types.GetItemOutput, AWSError> =
  return client
    .getItem(params, callback)
    .promise()
    .then((data) => {
      if (data.$response.error) {
        console.log(data.$response.error, data.$response.error.stack);
        result = "ERROR";
      } else {
        console.log(data.Item);
        console.log(data.Item!.pk!.S!);
        result = data.Item!.pk!.S!;
      }
      return result;
    });

  // const result request.send((error) => {console.log(error)});
  // console.log(result);
};

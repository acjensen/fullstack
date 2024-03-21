import Link from "next/link";
import { getData } from "./actions";
import { appName } from "../cdk/common";
import * as common from "../cdk/common";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>{`Hello, ${appName}!`}</h1>
      <div>{JSON.stringify(common)}</div>
      <Link href="/dashboard">Dashboard</Link>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

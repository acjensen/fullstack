import Link from "next/link";
import { getData } from "./actions";
import * as common from "../cdk/common";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>{`App name: ${common.fullStackAppSettings.appName}`}</h1>
      <div>{JSON.stringify(common, null, 2)}</div>
      <Link href="/dashboard">Dashboard</Link>
      <div></div>
      <Link href="/task">Task</Link>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}

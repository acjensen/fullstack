import { auth } from "../auth";
import Dashboard from "./dashboard";

export default async function Page() {
  const session = await auth();
  return <Dashboard session={session}></Dashboard>;
}

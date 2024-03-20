import Link from "next/link";
import { getData } from "./actions";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Link href="/dashboard">Dashboard</Link>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

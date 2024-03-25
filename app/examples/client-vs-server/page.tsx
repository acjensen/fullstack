import ClientComponent from "./client-component";
import ServerComponent from "./server-component";

export default async function Page() {
  return (
    <div>
      <h1>Client component</h1>
      <ClientComponent></ClientComponent>
      <hr></hr>
      <h1>Server component</h1>
      <ServerComponent></ServerComponent>
    </div>
  );
}

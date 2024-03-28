import ClientComponent from './client-component';
import ServerComponent from './server-component';

export default async function Page() {
  return (
    <div>
      <h1>Client component</h1>
      <ClientComponent />
      <hr />
      <h1>Server component</h1>
      <ServerComponent />
    </div>
  );
}

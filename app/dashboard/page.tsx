import { auth } from '../auth/auth';
import Dashboard from './dashboard';

export default async function Page() {
  const session = await auth();
  return <Dashboard session={session} />;
}

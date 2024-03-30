import { appSettings } from '../cdk/common';
import ClientNavbar from './ClientNavbar';
import { auth } from './auth/auth';

export default async function Navbar() {
  const session = await auth();
  return (
    <ClientNavbar
      session={session}
      appName={appSettings.appName}
    />
  );
}

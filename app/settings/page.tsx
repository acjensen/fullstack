import { auth } from '../auth/auth';
import { get } from '../server/actions';
import Picker, { defaultColor } from './Picker';

export default async function Page() {
  const session = await auth();

  return (
    <Picker
      session={session}
      initialColor={
        (session && (await get(session.user!.email!))?.color?.S) || defaultColor
      }
    />
  );
}

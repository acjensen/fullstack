import { auth, signOut } from '../auth/auth';

const SignOut = () => (
  <form
    action={async () => {
      'use server';

      await signOut();
    }}
  >
    <button type="submit">Sign out</button>
  </form>
);

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex h-screen bg-black">
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5 text-white">
        You are logged in as
        {' '}
        {session?.user?.email}
        <SignOut />
      </div>
    </div>
  );
}

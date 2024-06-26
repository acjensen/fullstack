import Link from 'next/link';
import { redirect } from 'next/navigation';
import { pages } from '../../pages';
import { auth, signIn } from '../auth';
import { Form } from './form';
import { SubmitButton } from './submit-button';

export default async function Login(props: any) {
  const callbackUrl: string = props.searchParams?.callbackUrl || '/';

  // If already logged in, skip the login page.
  const session = await auth();
  if (session) {
    redirect(callbackUrl);
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
          {props.searchParams.error && (
            <p className="text-sm text-red-500">Credentials not accepted</p>
          )}
        </div>
        <Form
          action={async (formData: FormData) => {
            'use server';

            let redirectPath: string | undefined;
            try {
              await signIn('credentials', {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                redirect: false, // We're using server-side redirection.
              });
              redirectPath = callbackUrl;
            } catch {
              redirectPath = `${pages.signin.route}?error=true`;
            } finally {
              if (redirectPath) {
                redirect(redirectPath);
              }
            }
          }}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href={pages.register.route} className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  );
}

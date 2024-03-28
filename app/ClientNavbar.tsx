'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logo from '../static/logo.svg';
import { navbarPages, pages, userPages } from './pages';

export default function Navbar(props: { session: any | undefined }) {
  const { session } = props;
  const isLoggedIn = !!session;

  const pathname = usePathname();

  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className="fixed inset-0 bg-transparent"
          onClick={() => { setOpen(false); }}
        />
      )}
      <nav className="border-gray-200 bg-white dark:bg-black">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} className="h-8" alt="Logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              App Name
            </span>
          </a>
          <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn
              ? (
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={handleDropDown}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="size-8 rounded-full"
                    src="/example-profile-picture.jpeg"
                    alt="user photo"
                  />
                </button>
              )
              : (
                <Link
                  href={`${pages.login.route}?callbackUrl=${pathname}`}
                  className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
                >
                  Sign in
                </Link>
              )}
            {isOpen && (
              <div
                className="absolute right-10 top-14 z-50 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {session?.user!.email}
                  </span>
                  <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                    {session?.user!.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {userPages.map((page) => (
                    <li>
                      <a
                        href={page.route}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {page.displayName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-user"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-black md:dark:bg-black">
              {navbarPages.map((page) => (
                <li>
                  <a
                    href={page.route}
                    className="block rounded px-3 py-2 text-white md:bg-transparent md:p-0 md:text-gray-700 md:dark:text-gray-500"
                    aria-current="page"
                  >
                    {page.displayName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

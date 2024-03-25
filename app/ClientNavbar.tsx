"use client";
import { useState } from "react";
import { navbarPages, pages, userPages } from "./pages";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(props: { session?: any }) {
  const session = props.session;
  const isLoggedIn = !!session;

  const pathname = usePathname();

  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-transparent"
          onClick={() => setOpen(false)}
        />
      )}
      <nav className="bg-white border-gray-200 dark:bg-black">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              App Name
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                onClick={handleDropDown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="/example-profile-picture.jpeg"
                  alt="user photo"
                />
              </button>
            ) : (
              <Link
                href={`${pages.login.route}?callbackUrl=${pathname}`}
                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              >
                Sign in
              </Link>
            )}
            {isOpen && (
              <div
                className={`absolute right-10 top-14 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {session && session.user!.email}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {session && session.user!.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {userPages.map((page) => {
                    return (
                      <li>
                        <a
                          href={page.route}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          {page.displayName}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
              {navbarPages.map((page) => {
                return (
                  <li>
                    <a
                      href={page.route}
                      className="block py-2 px-3 text-white rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-gray-500"
                      aria-current="page"
                    >
                      {page.displayName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
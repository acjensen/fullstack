import Link from 'next/link';
import { footerPages } from './pages';

export default function Footer() {
  return (
    <div className="flex shrink-0 bg-white shadow dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright © 2024 Andrew Jensen
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
          {footerPages.map((page) => (
            <li>
              <Link
                href={page.route}
                className="me-4 hover:underline md:me-6"
              >
                {page.displayName}
                {' '}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

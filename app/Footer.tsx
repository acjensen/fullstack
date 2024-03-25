import Link from "next/link";
import { footerPages } from "./pages";

export default function Footer() {
  return (
    <div className="bg-white shadow dark:bg-gray-800 flex flex-shrink-0">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright © 2024 Andrew Jensen
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {footerPages.map((page) => {
            return (
              <li>
                <Link
                  href={page.route}
                  className="hover:underline me-4 md:me-6"
                >
                  {page.displayName}{" "}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

import Link from "next/link";
import { pages } from "./pages";

export default async function Page() {
  return (
    <div>
      <ul>
        {Object.values(pages).map((page) => {
          return (
            <li>
              <Link href={`${page.route}`}>{page.displayName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

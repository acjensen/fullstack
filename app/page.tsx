import Link from "next/link";
import { routes } from "./pages";

export default async function Page() {
  return (
    <div>
      <ul>
        {routes.map((page) => {
          const pageName = `${page}`;
          return (
            <li>
              <Link href={pageName}>{pageName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

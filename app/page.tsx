import Link from "next/link";
import * as common from "../cdk/common";

export default async function Page() {
  return (
    <div>
      <ul>
        {Object.entries(common.fullStackAppSettings).map(([k, v]) => {
          return <li>{`${k}: ${v}`}</li>;
        })}
      </ul>
      <ul>
        {[
          "protected",
          "dashboard",
          "task",
          "login",
          "logout",
          "examples/server-page",
          "privacy",
          "color",
          "ping",
        ].map((page) => {
          const pageName = `/${page}`;
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

import * as common from "../../cdk/common";

export default async function Page() {
  return (
    <ul>
      {Object.entries(common.fullStackAppSettings).map(([k, v]) => {
        return <li>{`${k}: ${v}`}</li>;
      })}
    </ul>
  );
}

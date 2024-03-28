import * as common from '../../cdk/common';

export default async function Page() {
  return (
    <ul>
      {Object.entries(common.appSettings).map(([k, v]) => <li>{`${k}: ${v}`}</li>)}
    </ul>
  );
}

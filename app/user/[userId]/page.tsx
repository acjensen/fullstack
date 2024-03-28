import { get } from '../../server/actions';

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const user = await get(decodeURIComponent(userId));
  return (
    <div>
      <h1>
        User ID:
        {JSON.stringify(params)}
      </h1>
      <pre>
        User record:
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}

import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Post, PostProps } from '../../component/Post';
import { get } from '../../server/actions';

export default async function Page({ params }: { params: { itemId: string } }) {
  const itemId = decodeURIComponent(params.itemId);
  const item = await get(itemId);
  return itemId.includes('@') ? (
    <div>
      <pre>
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  ) : (
    <Post {...unmarshall(item) as PostProps} />
  );
}

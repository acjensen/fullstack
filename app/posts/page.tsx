import { Post } from '../component/Post';

export default function Page() {
  const exampleContent = { title: 'example title', pk: 'example pk' };
  const postContainer = (
    <div className="m-2">
      <Post {...exampleContent} />
    </div>
  );
  return (
    <div>
      {postContainer}
      {postContainer}
      {postContainer}
      {postContainer}
      {postContainer}
      {postContainer}
    </div>
  );
}

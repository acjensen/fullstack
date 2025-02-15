import Link from 'next/link';
import { pages } from './pages';

export default async function Page() {
  return (
    <div>
      <ul>
        <li>
          <Link href={`${pages.admin.route}`}>{pages.admin.displayName}</Link>
        </li>
      </ul>
    </div>
  );
}

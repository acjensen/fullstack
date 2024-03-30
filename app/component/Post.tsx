import translations from '../../translations/strings.json';

export interface PostProps {
  title: string;
  pk: string;
}

export const Post = (props: PostProps) => {
  return (
    <div>
      <a href={props.pk} className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{props.pk}</p>
        <p className="truncate font-normal text-gray-700 dark:text-gray-400">
          {translations.longText}
        </p>
      </a>
    </div>
  );
};

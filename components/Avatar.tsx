export interface AvatarProps {
  avatar_url: string;
  name: string;
  login: string;
}

export default function Avatar({ avatar_url, name, login }: AvatarProps) {
  return (
    <a
      href={`https://github.com/${login}`}
      target="_blank"
      className="group block flex-shrink-0"
    >
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-8 w-8 rounded-full"
            src={avatar_url}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-700 group-hover:text-gray-900">
            {name}
          </p>
          <p className="text-xs text-gray-500 group-hover:text-gray-700">
            @{login}
          </p>
        </div>
      </div>
    </a>
  );
}

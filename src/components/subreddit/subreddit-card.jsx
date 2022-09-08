import { Link } from "@tanstack/react-location";

export default function SubredditCard({ subreddit }) {
  if (!subreddit || !Object.keys(subreddit).length) return null;

  return (
    <div className="card card-bordered shadow-lg">
      <div className="card-body gap-2">
        <div className="flex flex-wrap items-end gap-2">
          <Link
            to={`/r/${subreddit.display_name}`}
            className="link-primary font-bold"
          >
            {`/r/${subreddit.display_name}`}
          </Link>
          <span>
            <span className="font-bold">{subreddit.subscribers}</span>{" "}
            subscribers
          </span>
        </div>
        {subreddit.public_description && (
          <div className="truncate">
            <span>{subreddit.public_description}</span>
          </div>
        )}
      </div>
    </div>
  );
}

import SubredditCard from "/src/components/subreddit/subreddit-card";

export default function SubredditCardList({ subreddits }) {
  if (!subreddits || !Object.keys(subreddits).length) return null;

  return (
    <div className="space-y-4">
      {subreddits.map(({ data: subreddit }) => (
        <SubredditCard subreddit={subreddit} key={subreddit.id} />
      ))}
    </div>
  );
}

import PostList from "/src/components/post/post-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import useInfiniteUrlQuery from "/src/hooks/use-inifnite-url-query";

export default function Subreddit() {
  // query
  const postsQuery = useInfiniteUrlQuery();

  return (
    <div className="space-y-8">
      {postsQuery.isLoading ? (
        <Loading />
      ) : postsQuery.isError ? (
        <Error />
      ) : (
        postsQuery.data?.pages.map((page, index) => (
          <PostList posts={page.data?.children} key={index} />
        ))
      )}
    </div>
  );
}

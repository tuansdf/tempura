import clsx from "clsx";
import { useEffect } from "react";
import PostList from "/src/components/post/post-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import useInfiniteUrlQuery from "/src/hooks/use-inifnite-url-query";

// post => {subreddit, selftext, title, ups, num_comments, total_awards_received, media_embed,
//                     score, created, id, author, url, thumbnail, preview, permalink}

export default function Home() {
  // query
  const postsQuery = useInfiniteUrlQuery();

  useEffect(() => {
    document.title = "Home - Tempura";
  }, []);

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

      <div className="flex justify-center">
        <button
          className={clsx("btn", { loading: postsQuery.isFetching })}
          onClick={postsQuery.fetchNextPage}
          disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
        >
          {postsQuery.isFetching
            ? "Loading..."
            : postsQuery.hasNextPage
            ? "Load more"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
}

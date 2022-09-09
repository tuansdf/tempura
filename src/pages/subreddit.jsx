import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useEffect } from "react";

import PostList from "/src/components/post/post-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import useInfiniteUrlQuery from "/src/hooks/use-inifnite-url-query";

export default function Subreddit() {
  // location
  const {
    params: { subreddit },
  } = useMatch();

  // query
  const postsQuery = useInfiniteUrlQuery();

  // effect
  useEffect(() => {
    document.title = `r/${subreddit}`;
  }, [subreddit]);

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

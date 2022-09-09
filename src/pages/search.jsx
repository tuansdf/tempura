import { Link, useSearch } from "@tanstack/react-location";
import clsx from "clsx";
import { useEffect } from "react";

import PostList from "/src/components/post/post-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";
import SubredditCardList from "/src/components/subreddit/subreddit-card-list";

import useInfiniteUrlQuery from "/src/hooks/use-inifnite-url-query";

const SearchTypes = Object.freeze({
  POSTS: "",
  COMMUNITIES: "sr",
  PEOPLE: "user",
});

export default function Search() {
  // location
  const search = useSearch();

  // query
  const postsQuery = useInfiniteUrlQuery();

  // effect
  useEffect(() => {
    document.title = `Search results for ${search.q}`;
  }, [search.q]);

  return (
    <div className="space-y-8">
      <div className="btn-group">
        <Link
          search={({ type, ...old }) => old}
          className={clsx("btn", { "btn-active": !search.type })}
        >
          Posts
        </Link>
        <Link
          search={(old) => ({ ...old, type: SearchTypes.COMMUNITIES })}
          className={clsx("btn", {
            "btn-active": search.type === SearchTypes.COMMUNITIES,
          })}
        >
          Communities
        </Link>
      </div>

      {postsQuery.isLoading ? (
        <Loading />
      ) : postsQuery.isError ? (
        <Error />
      ) : !search.type ? (
        postsQuery.data?.pages.map((page, index) => (
          <PostList posts={page.data?.children} key={index} />
        ))
      ) : search.type === SearchTypes.COMMUNITIES ? (
        postsQuery.data?.pages.map((page, index) => (
          <SubredditCardList subreddits={page.data?.children} key={index} />
        ))
      ) : (
        <Error />
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

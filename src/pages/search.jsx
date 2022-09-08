import { Link, useSearch } from "@tanstack/react-location";
import clsx from "clsx";

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

  return (
    <div className="space-y-8">
      <div className="btn-group">
        <Link
          to="/search/"
          search={({ type, ...old }) => old}
          className={clsx("btn", { "btn-active": !search.type })}
        >
          Posts
        </Link>
        <Link
          to="/search/"
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
    </div>
  );
}

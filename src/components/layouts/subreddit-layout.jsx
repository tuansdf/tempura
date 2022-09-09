import { Outlet, useMatch } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { subredditAtom } from "/src/stores/params.store";

export default function SubredditLayout() {
  // location
  const { params } = useMatch();

  // atom
  const [subredditName, setSubredditName] = useAtom(subredditAtom);

  // effect
  useEffect(() => {
    setSubredditName(params.subreddit);

    return () => setSubredditName();
  }, [params]);

  return <Outlet />;
}

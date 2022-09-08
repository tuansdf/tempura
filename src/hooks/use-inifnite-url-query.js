import { useLocation } from "@tanstack/react-location";
import { useInfiniteQuery } from "react-query";
import { getReddit } from "/src/helpers/reddit-api";

export default function useInfiniteUrlQuery() {
  // location
  const {
    current: { pathname, search },
  } = useLocation();

  // query
  const dataQuery = useInfiniteQuery(
    ["infinite-query", pathname, search],
    async ({ pageParam }) =>
      getReddit(pathname, { ...search, after: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage?.data?.after || undefined,
    }
  );

  return dataQuery;
}

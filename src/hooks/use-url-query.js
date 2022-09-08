import { useLocation } from "@tanstack/react-location";
import { useQuery } from "react-query";
import { getReddit } from "/src/helpers/reddit-api";

export default function useUrlQuery() {
  // location
  const {
    current: { pathname, search },
  } = useLocation();

  // query
  const dataQuery = useQuery(["query", pathname, search], async () =>
    getReddit(pathname, search)
  );

  return dataQuery;
}

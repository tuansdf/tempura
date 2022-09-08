import queryString from "query-string";

const baseUrl = "https://www.reddit.com";

export const getReddit = async (resource, query) => {
  const pathname = `${baseUrl}${resource}.json`;

  const search = query ? queryString.stringify(query) : "";

  const url = `${pathname}?${search}`;

  const res = await fetch(url);

  return res.json();
};

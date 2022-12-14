import { ReactLocation, Router } from "@tanstack/react-location";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "/src/components/layouts/layout";
import SubredditLayout from "/src/components/layouts/subreddit-layout";
import Home from "/src/pages/home";
import PostDetail from "/src/pages/post-detail";
import Search from "/src/pages/search";
import Subreddit from "/src/pages/subreddit";
import User from "/src/pages/user";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

const location = new ReactLocation();

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/r/:subreddit",
    element: <SubredditLayout />,
    children: [
      {
        path: "/",
        element: <Subreddit />,
      },
      {
        path: "/search/",
        element: <Search />,
      },
      {
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/user/:username",
    element: <User />,
  },
  {
    path: "/search/",
    element: <Search />,
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router routes={routes} location={location}>
        <Layout />
      </Router>
    </QueryClientProvider>
  );
}

export default App;

import { Outlet } from "@tanstack/react-location";

import Header from "/src/components/layouts/header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container max-w-screen-md flex-1 py-4">
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet } from "@tanstack/react-location";

import Header from "/src/components/layouts/header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container max-w-screen-md">
        <Outlet />
      </div>
    </>
  );
}

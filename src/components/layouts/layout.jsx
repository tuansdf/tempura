import { Outlet } from "@tanstack/react-location";

import Header from "/src/components/layouts/header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container max-w-screen-md flex-1 py-4">
        <Outlet />
      </div>

      <div>
        {/* website's icon */}
        <a
          href="https://www.flaticon.com/free-stickers/food"
          title="food stickers"
        >
          Food stickers created by Adib Sulthon - Flaticon
        </a>
      </div>
    </div>
  );
}

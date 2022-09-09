import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Themes } from "/src/constants/themes";

import { themeAtom } from "/src/stores/theme.store";

export default function Header() {
  // location
  const navigate = useNavigate();
  const search = useSearch();
  const {
    current: { pathname },
  } = useLocation();

  const [query, setQuery] = useState("");
  const [isMenu, setIsMenu] = useState(false);

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    switchTheme(theme);
  }, []);

  const switchTheme = (newTheme) => {
    const html = document.querySelector("html");
    setTheme(newTheme);
    html.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    const html = document.querySelector("html");
    setTheme(newTheme);
    html.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    setQuery(search.q || "");
  }, [search.q]);

  const onChangeSearch = (e) => setQuery(e.target.value);
  const onSubmitSearch = (e) => {
    if (!query) return;
    e.preventDefault();
    navigate({
      to:
        pathname.endsWith("search") || pathname.endsWith("search/")
          ? pathname
          : `${pathname}/search/`,
      search: (old) => ({
        ...old,
        q: query,
        restrict_sr: pathname.startsWith("/r/") ? 1 : null,
      }),
    });
  };

  const toggleMenu = () => setIsMenu((prev) => !prev);

  return (
    <>
      <nav className="navbar relative p-0">
        {/* left */}
        <ul className="ml-4">
          <li>
            <Link className="btn btn-ghost" to="/">
              Home
            </Link>
          </li>
        </ul>
        {/* end/left */}

        {/* middle */}
        <button
          onClick={toggleMenu}
          className="btn btn-circle btn-ghost ml-auto mr-4 md:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div
          className={clsx(
            "absolute top-full z-40 ml-auto w-full overflow-hidden bg-base-100 transition-all md:relative md:h-max md:w-auto md:pb-0",
            { "h-0": !isMenu },
            { "py-4": isMenu }
          )}
        >
          <ul className="flex flex-wrap items-start gap-2 md:flex-nowrap">
            <li className="order-last ml-4 md:order-first md:ml-0">
              <form
                role="search"
                className="form-control"
                onSubmit={onSubmitSearch}
              >
                <div className="input-group">
                  <input
                    className="input input-bordered"
                    type="search"
                    placeholder="Search"
                    value={query}
                    onChange={onChangeSearch}
                  />
                  <button className="btn btn-square">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                </div>
              </form>
            </li>
            <li className="ml-4 md:ml-0">
              <a
                href="https://github.com/tuansdf/tempura"
                target="_blank"
                className="btn btn-ghost"
              >
                GitHub
              </a>
            </li>
            <li>
              <button className="btn btn-ghost" onClick={toggleTheme}>
                Theme
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

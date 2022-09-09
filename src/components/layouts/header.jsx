import {
  Bars3Icon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { themeAtom } from "/src/stores/theme.store";

const Header = () => {
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

  const switchTheme = (theme) => {
    setTheme(theme);
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    setQuery(search.q || "");
  }, [search.q]);

  const onChangeSearch = (e) => setQuery(e.target.value);
  const onSubmitSearch = (e) => {
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
      <nav className="navbar relative mb-4 shadow">
        {/* left */}
        <ul>
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
          className="btn btn-ghost btn-circle ml-auto md:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <ul
          className={clsx(
            "absolute top-full z-50 ml-auto flex w-full flex-col items-start gap-2 overflow-hidden bg-base-100 shadow transition-all md:relative md:h-max md:w-auto md:flex-row",
            { "h-0": !isMenu }
          )}
        >
          <li>
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
          <li>
            <a
              href="https://github.com/tuansdf/tempura"
              target="_blank"
              className="btn btn-ghost"
            >
              GitHub
            </a>
          </li>
          <li>
            <div className="dropdown-end dropdown">
              <label tabIndex="0" className="btn btn-ghost">
                Theme
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu rounded-box mt-3 w-40 bg-base-100 p-2 shadow"
              >
                <li onClick={() => switchTheme("garden")}>
                  <div>
                    <SunIcon className="h-6 w-6" /> Light
                  </div>
                </li>
                <li onClick={() => switchTheme("dracula")}>
                  <div>
                    {" "}
                    <MoonIcon className="h-6 w-6" /> Dark
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;

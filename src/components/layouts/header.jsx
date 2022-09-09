import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
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

import GitHubIcon from "/src/assets/github-icon";
import { Themes } from "/src/constants/themes";
import { subredditAtom } from "/src/stores/params.store";
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
  const [subreddit] = useAtom(subredditAtom);

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
      to: subreddit ? `/r/${subreddit}/search/` : "/search/",
      search: (old) => {
        const search = {
          ...old,
          q: query,
        };
        if (subreddit) search.restrict_sr = 1;
        return search;
      },
    });
  };

  const toggleMenu = () => setIsMenu((prev) => !prev);

  return (
    <>
      <nav className="navbar relative p-0">
        {/* left */}
        <ul className="ml-4">
          <li title="Home">
            <Link className="btn btn-ghost btn-square" to="/">
              <HomeIcon className="h-6 w-6" />
            </Link>
          </li>
        </ul>
        {/* end/left */}

        {/* middle */}
        <label className="swap-rotate btn btn-circle swap btn-ghost ml-auto mr-4 md:hidden">
          <input type="checkbox" checked={isMenu} onChange={toggleMenu} />
          <XMarkIcon className="swap-on h-6 w-6" />
          <Bars3Icon className="swap-off h-6 w-6" />
        </label>
        <div
          className={clsx(
            "absolute top-full z-40 ml-auto w-full overflow-hidden bg-base-100 transition-all md:relative md:h-max md:w-auto md:bg-inherit md:pb-0",
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
            <li className="ml-4 md:ml-0" title="GitHub">
              <a
                href="https://github.com/tuansdf/tempura"
                target="_blank"
                className="btn btn-ghost btn-square"
              >
                <GitHubIcon className="h-6 w-6" />
              </a>
            </li>
            <li className="md:mr-4" title="Switch Theme">
              <label className="swap-rotate btn btn-circle swap btn-ghost">
                <input
                  type="checkbox"
                  checked={theme === Themes.DARK}
                  onChange={toggleTheme}
                />
                <SunIcon className="swap-on h-6 w-6" />
                <MoonIcon className="swap-off h-6 w-6" />
              </label>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

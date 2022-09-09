import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-location";
import clsx from "clsx";
import { useState } from "react";

import CommentList from "/src/components/comment/comment-list";
import Markdown from "/src/components/shared/markdown";

import { getDateTimeMessage, getElapsedTimeMessage } from "/src/helpers/date";

export default function Comment({ maxDepth = 10, defaultDepth = 5, comment }) {
  if (!comment || !Object.keys(comment).length) return null;

  const [isCollapsed, setIsCollapsed] = useState(comment.depth >= defaultDepth);

  const replies = comment?.replies?.data?.children;

  const toggleComment = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (!(comment.author && comment.depth < maxDepth)) return null;

  return (
    <div className="grid gap-2 border-l-2 border-base-content border-opacity-20 pl-4">
      {/* header */}
      <div className="flex flex-wrap items-end gap-2">
        <Link className="link-primary" to={`/user/${comment.author}`}>
          u/{comment.author}
        </Link>

        <span title={getDateTimeMessage(comment.created)} className="text-sm">
          {getElapsedTimeMessage(comment.created)}
        </span>

        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleComment}
            checked={isCollapsed}
          />
          <ArrowsPointingOutIcon className="swap-on h-6 w-6" />
          <ArrowsPointingInIcon className="swap-off h-6 w-6" />
        </label>
      </div>
      {/* end header */}

      {/* body */}
      <div className={clsx("grid gap-4", { hidden: isCollapsed })}>
        {/* comment */}
        <Markdown content={comment.body || ""} />
        {/* more comments */}
        <CommentList comments={replies} />
      </div>
      {/* end body */}
    </div>
  );
}

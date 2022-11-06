import {
  ArrowUpIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-location";

import HlsPlayer from "/src/components/post/hls-player";
import Markdown from "/src/components/shared/markdown";

import { getDateTimeMessage, getElapsedTimeMessage } from "/src/helpers/date";
import { getCompactNumber } from "/src/helpers/number";

export default function PostCard({ post, isDetail = false }) {
  if (!post || !Object.keys(post).length) return null;

  const videoUrl =
    post.media?.reddit_video?.hls_url ||
    post.preview?.reddit_video_preview?.hls_url;

  return (
    <div className="card card-bordered shadow-lg">
      <div className="card-body gap-4 p-0 md:p-8">
        {/* header */}
        <div className="space-y-1 px-3 pt-4 md:p-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/r/${post.subreddit}`}
              className="link-primary font-bold"
            >
              r/{post.subreddit}
            </Link>
            <span title={getDateTimeMessage(post.created)} className="text-sm">
              {getElapsedTimeMessage(post.created)}
            </span>
          </div>

          <Link
            to={`/user/${post.author}`}
            className="link-primary inline-block text-sm"
          >
            u/{post.author}
          </Link>
        </div>
        {/* end header */}

        {/* body */}
        <div className="px-3 md:px-0">
          <Link
            className="font-bold"
            to={isDetail ? null : post.permalink}
            disabled={isDetail}
          >
            {post.title || post.link_title}
          </Link>
        </div>

        {post.url_overridden_by_dest && (
          <div className="truncate px-3 md:px-0">
            <a href={post.url_overridden_by_dest} className="text-sm">
              {post.url_overridden_by_dest}
            </a>
          </div>
        )}

        {(post.selftext || post.body) && (
          <div className="px-3 md:px-0">
            <Markdown content={post.selftext || post.body} clamp={!isDetail} />
          </div>
        )}

        {videoUrl && (
          <div className="flex aspect-video items-center justify-center">
            <HlsPlayer url={videoUrl} />
          </div>
        )}

        {post.post_hint === "image" && (
          <div className="flex items-center justify-center overflow-hidden md:aspect-video">
            <img
              src={post.url_overridden_by_dest}
              alt=""
              className="rounded-sm md:h-full md:w-auto"
            />
          </div>
        )}

        {post.is_gallery && <pre>// TODO: support gallery</pre>}
        {/* end body */}

        {/* footer */}
        <div className="flex flex-wrap items-center gap-4 px-3 pb-4 text-sm md:p-0 md:text-base">
          <span className="flex items-center gap-2">
            <ArrowUpIcon className="h-5 w-5" />
            <span className="" title={post.score}>
              {getCompactNumber(post.score)}
            </span>{" "}
          </span>
          <span className="flex items-center gap-2">
            {post.num_comments > 0 ? (
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            ) : (
              <ChatBubbleBottomCenterIcon className="h-5 w-5" />
            )}
            <span className="" title={post.num_comments}>
              {getCompactNumber(post.num_comments)}
            </span>{" "}
          </span>
          {post.stickied && (
            <span className="badge badge-primary font-bold">Pinned</span>
          )}
        </div>
        {/* end footer */}
      </div>
    </div>
  );
}

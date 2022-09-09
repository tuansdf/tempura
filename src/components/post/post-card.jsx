import { Link } from "@tanstack/react-location";
import HlsPlayer from "/src/components/post/hls-player";
import Markdown from "/src/components/shared/markdown";
import { getElapsedTimeMessage } from "/src/helpers/date";

export default function PostCard({ post, isDetail = false }) {
  if (!post || !Object.keys(post).length) return null;

  const videoUrl =
    post.media?.reddit_video?.hls_url ||
    post.preview?.reddit_video_preview?.hls_url;

  return (
    <div className="card card-bordered shadow-lg">
      <div className="card-body space-y-2 p-4 md:space-y-4 md:p-8">
        {/* header */}
        <div className="flex flex-wrap gap-2">
          <Link to={`/r/${post.subreddit}`} className="link-primary font-bold">
            r/{post.subreddit}
          </Link>
          <Link to={`/user/${post.author}`} className="link-primary">
            u/{post.author}
          </Link>
          <span className="t">{getElapsedTimeMessage(post.created)}</span>
        </div>
        {/* end header */}

        {/* body */}

        <div>
          <Link
            className="card-title link-primary inline text-base"
            to={isDetail ? null : post.permalink}
            disabled={isDetail}
          >
            {post.title || post.link_title}
          </Link>
        </div>

        {post.url_overridden_by_dest && (
          <div>
            <a className="truncate" href={post.url_overridden_by_dest}>
              {post.url_overridden_by_dest}
            </a>
          </div>
        )}

        {(post.selftext || post.body) && (
          <Markdown content={post.selftext || post.body} clamp={!isDetail} />
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
        <div className="flex flex-wrap gap-2">
          <span>
            <span className="font-bold">{post.score}</span> upvotes
          </span>
          <span>
            <span className="font-bold">{post.num_comments}</span> comments
          </span>
          {post.stickied && <span className="badge font-bold">Pinned</span>}
        </div>
        {/* end footer */}
      </div>
    </div>
  );
}

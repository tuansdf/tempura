import CommentList from "/src/components/comment/comment-list";
import PostCard from "/src/components/post/post-card";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import useUrlQuery from "/src/hooks/use-url-query";

export default function PostDetail() {
  // query
  const postQuery = useUrlQuery();

  return (
    <div className="space-y-8">
      {postQuery.isLoading ? (
        <Loading />
      ) : postQuery.isError ? (
        <Error />
      ) : (
        <>
          <PostCard isDetail post={postQuery.data[0]?.data.children[0].data} />
          <CommentList comments={postQuery.data[1]?.data.children} />
        </>
      )}
    </div>
  );
}

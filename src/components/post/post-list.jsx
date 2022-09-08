import PostCard from "/src/components/post/post-card";

export default function PostList({ posts }) {
  if (!posts || !Object.keys(posts).length) return null;

  return (
    <div className="space-y-8">
      {posts.map(({ data: post }) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}

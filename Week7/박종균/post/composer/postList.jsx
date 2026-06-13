import { getPosts } from "../api/posts";
import PostCard from "./postCard";

export default async function PostList() {
  const posts = await getPosts();

  if (!posts.length) {
    return (
      <div className="rounded border border-gray-200 p-4 text-gray-500">
        No posts yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
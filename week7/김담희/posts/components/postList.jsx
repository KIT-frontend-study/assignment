import { getPosts } from "../api/posts";
import PostCard from "./postCard";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post}></PostCard>
      ))}
    </div>
  );
}

import Link from "next/link";
import DeletePostButton from "./deletePostButton";

export default function PostCard({ post }) {
  return (
    <div className="border p-2">
      <Link href={`/posts/${post.id}`} className="block cursor-pointer">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-xl"> {post.summary}</p>
        <p className="text-sm">{post.author}</p>
        <p className="text-xs">{post.createdAt}</p>
      </Link>
      <DeletePostButton postId={post.id} />
    </div>
  );
}

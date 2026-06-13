import Link from "next/link";
import { getPost } from "../api/posts";

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/post" className="text-sm text-gray-600 hover:text-black">
        Back to posts
      </Link>
      <article className="mt-6 rounded border border-gray-200 p-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="mt-3 flex gap-3 text-sm text-gray-500">
          <span>{post.author}</span>
          <span>Views {post.viewCount}</span>
          <span>{post.createdAt}</span>
        </div>
        <p className="mt-6 whitespace-pre-wrap leading-7">{post.content}</p>
      </article>
    </main>
  );
}
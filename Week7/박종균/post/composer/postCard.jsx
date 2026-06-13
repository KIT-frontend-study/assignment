"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "../api/posts";

export default function PostCard({ post }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const shouldDelete = window.confirm("Delete this post?");

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    await deletePost(post.id);
    router.refresh();
  };

  return (
    <article className="rounded border border-gray-200 p-4 transition hover:border-gray-400 hover:bg-gray-50">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/post/${post.id}`} className="min-w-0 flex-1">
          <div className="text-lg font-semibold">{post.title}</div>
          <div className="mt-2 line-clamp-2 text-sm text-gray-600">{post.content}</div>
          <div className="mt-3 flex gap-3 text-xs text-gray-500">
            <span>{post.author}</span>
            <span>Views {post.viewCount}</span>
            <span>{post.createdAt}</span>
          </div>
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="shrink-0 rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}
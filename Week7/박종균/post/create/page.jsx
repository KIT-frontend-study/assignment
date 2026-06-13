"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "../api/posts";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      return;
    }

    setIsSubmitting(true);

    await createPost({
      title,
      content,
      author,
    });

    setTitle("");
    setContent("");
    setAuthor("");
    router.push("/post");
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Enter a title"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-40 rounded border border-gray-300 px-3 py-2"
            placeholder="Enter post content"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Author</span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Enter author name"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-black px-4 py-2 text-white disabled:bg-gray-400"
        >
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
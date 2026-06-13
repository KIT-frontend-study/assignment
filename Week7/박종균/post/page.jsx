import Link from "next/link";
import { Suspense } from "react";
import LoadingPosts from "./composer/loadingPosts";
import PostList from "./composer/postList";

export default function PostPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/post/create" className="rounded bg-black px-4 py-2 text-sm text-white">
          New post
        </Link>
      </div>

      <Suspense fallback={<LoadingPosts />}>
        <PostList />
      </Suspense>
    </main>
  );
}
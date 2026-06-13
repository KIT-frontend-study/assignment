import { Suspense } from "react";
import PostListLoading from "../shared/ui/PostListLoading";
import PostList from "./components/postList";
import Link from "next/link";

export default async function PostsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top nav bar */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="../"
            className="group flex items-center gap-2 text-sm text-stone-400 hover:text-stone-800 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            이전 페이지
          </Link>

          <span className="text-xs tracking-widest uppercase text-stone-300 font-medium select-none">
            Board
          </span>
        </div>
      </header>

      {/* Page body */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Heading row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-1 font-medium">
              Community
            </p>
            <h1
              className="text-4xl font-bold text-stone-900 leading-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
            >
              게시판
            </h1>
          </div>

          <Link
            href="./create-post"
            className="group inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            게시글 작성
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-200 mb-8" />

        {/* Post list */}
        <Suspense fallback={<PostListLoading />}>
          <PostList />
        </Suspense>
      </main>
    </div>
  );
}
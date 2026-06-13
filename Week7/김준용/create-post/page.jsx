"use client";

import { useState } from "react";
import { createPost } from "./api/postPost";
import Link from "next/link";
import { redirect } from 'next/navigation'

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();

    // Guard: stop if any field is empty or only whitespace
    if (!title.trim() || !content.trim() || !author.trim()) return;

    await createPost({ title, content, author });
    setTitle("");
    setContent("");
    setAuthor("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    redirect("/posts");
  };

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Sticky header — same pattern as other pages */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/posts"
            className="group flex items-center gap-2 text-sm text-stone-400 hover:text-stone-800 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            게시판으로
          </Link>
          <span className="text-xs tracking-widest uppercase text-stone-300 font-medium select-none">
            New Post
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Page heading */}
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-1 font-medium">
            Write
          </p>
          <h1
            className="text-4xl font-bold text-stone-900"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            새 게시글
          </h1>
        </div>

        <div className="h-px bg-stone-200 mb-8" />

        {/* Success message — fades in when submitted=true */}
        {submitted && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            게시글이 등록되었습니다 ✓
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          {/* Each field follows the same label + input pattern */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest uppercase text-stone-400 font-medium">
              제목
            </label>
            <input required
              className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest uppercase text-stone-400 font-medium">
              작성자
            </label>
            <input required
              className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 transition"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest uppercase text-stone-400 font-medium">
              내용
            </label>
            {/* textarea instead of input for multi-line content */}
            <textarea required
              className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 transition resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={8}
            />
          </div>

          <div className="h-px bg-stone-200" />

          {/* Submit button — same pill style as other pages */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium px-7 py-3 rounded-full transition-all duration-200"
            >
              게시글 등록
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
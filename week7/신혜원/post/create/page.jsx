"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "../api/posts"; 

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("일반");
  const [tags, setTags] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) return alert("모든 항목을 입력해 주세요!");

    const tagArray = tags
      ? tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
      : [];

    const payload = { title, content, author, category, tags: tagArray };

    await createPost(payload);

    setTitle("");
    setContent("");
    setAuthor("");
    setCategory("일반");
    setTags("");

    router.push("/post");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight">새 게시물 작성</h1>
      
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

        {/* 제목 입력 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">제목</label>
          <input
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 내용 입력 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">내용</label>
          <textarea
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm min-h-[200px] resize-y leading-relaxed"
            placeholder="내용을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 작성자 입력 */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">작성자</label>
          <input
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            placeholder="작성자를 입력해 주세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* 제출하기 및 취소 버튼 영역 */}
        <div className="flex items-center gap-3 mt-2">
          <button 
            type="submit" 
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-colors"
          >
            제출하기
          </button>
          
          <button 
            type="button" 
            onClick={() => router.push("/post")} // 목록 페이지로 이동
            className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            취소
          </button>
        </div>

      </form>
    </div>
  );
}
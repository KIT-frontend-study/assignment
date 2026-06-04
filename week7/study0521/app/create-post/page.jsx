"use client";

import { useState } from "react";
import { createPost } from "./api/postPost";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPost({
      title,
      content,
      author,
    });

    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <div>
      <div>포스트 생성페이지입니다.</div>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <input
          className="border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title 입력하세요"
        ></input>
        <input
          className="border"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content 입력하세요"
        ></input>
        <input
          className="border"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="author 입력하세요"
        ></input>
        <button type="submit" className="w-fit border">
          게시글 생성
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "../api/post";

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            content,
            author,
        };

        await createPost(payload);

        setTitle("");
        setContent("");
        setAuthor("");

        router.replace("/post");
    };

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="text-2xl font-bold">게시글 생성 페이지입니다.</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="제목을 입력해 주세요."
                />
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="내용을 입력해 주세요."
                />
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="작성자를 입력해 주세요."
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    게시글 등록
                </button>
            </form>
        </div>
    );
}
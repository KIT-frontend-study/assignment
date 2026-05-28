"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePost } from "../api/post";

export default function PostCard({ post }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("정말 삭제하시겠습니까?");
        if (!confirmed) return;

        await deletePost(post.id);
        router.refresh();
    };

    return (
        <div className="border flex flex-col gap-3 p-3">
            <div className="font-bold text-lg">{post.title}</div>
            <div>{post.summary}</div>
            <div className="text-sm text-gray-500">{post.author}</div>
            <div className="text-sm text-gray-400">{post.createdAt}</div>

            <div className="flex gap-2 mt-2">
                <Link
                    href={`/post/${post.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                    상세보기
                </Link>

                <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}
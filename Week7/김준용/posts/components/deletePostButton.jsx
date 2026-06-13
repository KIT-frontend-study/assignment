"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "../api/posts";

export default function DeletePostButton({ postId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);

    try {
      await deletePost(postId);
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className="border px-2 py-1 disabled:opacity-50"
      disabled={isDeleting}
      type="button"
      onClick={handleDeletePost}
    >
      {isDeleting ? "삭제 중..." : "삭제하기"}
    </button>
  );
}

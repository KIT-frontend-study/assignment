"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "../api/posts";

export default function DeletePostButton({ postId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      await deletePost(postId);
      setIsModalOpen(false); // 삭제 성공 시 모달 닫기
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  // 버튼 클릭 시 카드 전체로 클릭 이벤트가 퍼지는 것 방지
  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 삭제하기 버튼 */}
      <button
        className="text-slate-400 hover:text-red-500 hover:bg-red-50 font-medium text-xs px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-50"
        disabled={isDeleting}
        type="button"
        onClick={openModal} // 클릭 시 모달 열기
      >
        삭제하기
      </button>

      {/* 팝업 모달 */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={closeModal} // 배경 클릭 시 닫기
        >
          {/* 모달 카드 영역 */}
          <div 
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl border border-slate-150 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히는 것 방지
          >
            {/* 경고 아이콘 영역 */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            {/* 텍스트 영역 */}
            <div className="text-center mb-6">
              <h3 className="text-base font-bold text-slate-850 mb-1">게시글 삭제</h3>
              <p className="text-sm text-slate-500">
                진짜로 이 게시글을 삭제하시겠습니까?<br />
                삭제된 데이터는 복구할 수 없습니다.
              </p>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold transition-colors cursor-pointer"
                onClick={closeModal}
              >
                취소
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer flex justify-center items-center disabled:opacity-50"
                disabled={isDeleting}
                onClick={handleDeletePost}
              >
                {isDeleting ? "삭제 중..." : "삭제하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
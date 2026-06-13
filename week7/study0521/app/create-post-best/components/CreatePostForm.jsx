"use client";

// UI 경계: 화면에 보이는 입력 필드와 제출 버튼만 책임진다.
// DOM 이벤트는 여기서 field/value로 바꿔서 훅에 넘긴다.
// 덕분에 훅은 input 이벤트 구조를 몰라도 되고, 이 컴포넌트도 API 주소/전송 방식을 알 필요가 없다.
import { useCreatePostForm } from "../hooks/useCreatePostForm";

export default function CreatePostForm() {
  const { formValues, isSubmitting, handleFieldChange, submitPost } =
    useCreatePostForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className="border p-2"
        value={formValues.title}
        onChange={(e) =>
          handleFieldChange({ field: "title", value: e.target.value })
        }
        placeholder="title 입력하세요"
      />
      <input
        className="border p-2"
        value={formValues.content}
        onChange={(e) =>
          handleFieldChange({ field: "content", value: e.target.value })
        }
        placeholder="content 입력하세요"
      />
      <input
        className="border p-2"
        value={formValues.author}
        onChange={(e) =>
          handleFieldChange({ field: "author", value: e.target.value })
        }
        placeholder="author 입력하세요"
      />
      <button
        className="w-fit border px-3 py-2 disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        게시글 생성
      </button>
    </form>
  );
}

// 라우트 진입점: 게시글 생성 페이지의 큰 틀만 조립한다.
// 폼 상태, 제출 흐름, API 세부 구현은 하위 계층이 소유한다.
import CreatePostForm from "./components/CreatePostForm";

export default function CreatePostBestPage() {
  return (
    <main className="flex flex-col gap-6 p-4">
      <header>
        <h1 className="text-2xl font-bold">게시글 생성</h1>
      </header>

      <CreatePostForm />
    </main>
  );
}

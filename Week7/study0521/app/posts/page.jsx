import { Suspense } from "react";
import PostListLoading from "../shared/ui/PostListLoading";
import PostList from "./components/postList";
import Link from "next/link";

export default async function PostsPage() {
  return (
    <>
      <div className="text-2xl font-bold mb-3">게시판 페이지입니다</div>

      {/* 게시글목록 페이지가 게시글 생성하기 버튼을 누르면 어디로 가는지 등의 내부 구현을
      알필요가 전혀없다. 따라서 해당부분은 추상화 하는게 좋지만 시간상 넘어간다. */}
      <Link href="./create-post" className="inline-flex w-fit border">
        게시글 생성하기
      </Link>
      <Suspense fallback={<PostListLoading />}>
        <PostList />
      </Suspense>
    </>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import PostList from "./components/postList";
import LoadingPosts from "./components/loadingPage";

export default async function PostPage() {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="text-2xl font-bold">포스트 페이지입니다.</div>

            <Link
                href="/post/create"
                className="w-fit px-4 py-2 bg-green-500 text-white rounded"
            >
                게시글 생성하기
            </Link>

            <Suspense fallback={<LoadingPosts />}>
                <PostList />
            </Suspense>
        </div>
    );
}
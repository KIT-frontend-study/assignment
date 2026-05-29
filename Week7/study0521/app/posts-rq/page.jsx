"use client";

import PostListRq from "./components/postList-rq";

export default function PostsRqPage() {
    return (
    <> 
        <div className="flex flex-col gap-3"> 
            RQ 게시판 페이지입니다
            <PostListRq/>
        </div>
    </>
    )
}
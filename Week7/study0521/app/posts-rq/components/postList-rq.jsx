"use client";

import {useQuery} from "@tanstack/reack-query";
import {getPosts} from "../api/posts";
import DeleteButtonRQ from "./DeleteButtonRQ";

export default function PostListRq(){
    const {data, isLoading, error} = useQuery({
        queryKey:["posts"],
        queryFn: getPosts,
        staleTime: 1000*30,
    });

    if (isPending) return <div>게시물을 불러오는 중입니다...</div>;
    if (isError) return <div>에러가 발생했습니다: {error.message}</div>

    return (
        <div className="flex flex-col gap-3">
            {data.map((post) => (
                <div key={post.id} className="border p-2">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p>{post.summary}</p>
                    <p className="text-sm">{post.author}</p>
                    <DeleteButtonRQ postId={post.id}/>
                </div>
            ))}
        </div>
    );
}
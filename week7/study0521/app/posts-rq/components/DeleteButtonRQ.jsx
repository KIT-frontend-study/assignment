"use client";

import {useMutation} from "@tanstack/react-query";
import {deletePost} from "../api/posts";

export default function DeleteButtonRQ({postID}){
    const queryClient = useQueryClient();
    const { mutate, isPending} = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]});
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    return (
        <button className="border px-2 py-1 disabled:opacity-50"
        disabled={isPending}
        type="button"
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            mutate();              mutate(postId);
        }}>
            {isPending ? "삭제 중..." : "삭제하기"}
        </button>
    )
}
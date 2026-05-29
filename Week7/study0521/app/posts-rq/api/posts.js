export async function getPosts() {
    const res = await fetch("http://localhost:4000/posts");
    if(!res.ok) throw new Error("게시판 목록을 불러오지 못했습니다");
    return res.json();
}

export async function deletePost(postId) {
    const res = await fetch('http://localhost:4000/posts/${postId}',{
        method: "DELETE",
    });
    if (!res.ok) throw new Error("게시판을 삭제하지 못했습니다");
    return res.json();
}
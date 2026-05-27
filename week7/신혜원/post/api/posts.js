// 게시글 목록 조회
export async function getPosts() {
  const res = await fetch("http://localhost:4000/posts", {
    cache: "no-store",
  });
  // 스터디 자료에 있는 2초 로딩 지연
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await res.json();
}

// 게시글 삭제
export async function deletePost(id) {
  const res = await fetch(`http://localhost:4000/posts/${id}`, {
    method: "DELETE",
  });
  // 스터디 자료에 있는 1초 로딩 지연
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return res;
}

// 💡 내가 작성했던 대로 여기에 합쳐둔 게시글 생성 API
export async function createPost(post) {
  const res = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res;
}
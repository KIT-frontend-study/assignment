// API 경계: 하나의 백엔드 동작과 하나의 요청 형태만 담당한다.
// 호출자는 게시글 payload만 넘기고 endpoint나 fetch 옵션은 몰라도 된다.
export async function createPost(post) {
  return fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
}

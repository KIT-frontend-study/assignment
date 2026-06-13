const API_URL = process.env.NEXT_PUBLIC_POST_API_URL ?? "http://localhost:4000/posts";

async function readJson(res) {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function getPosts() {
  const res = await fetch(API_URL, { cache: "no-store" });

  return readJson(res);
}

export async function getPost(id) {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  return readJson(res);
}

export async function createPost(post) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return readJson(res);
}

export async function deletePost(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return readJson(res);
}
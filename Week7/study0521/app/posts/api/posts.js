export async function getPosts() {
  const res = await fetch("http://localhost:4000/posts", {
    cache: "no-store",
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return await res.json();
}

export async function deletePost(id) {
  const res = await fetch(`http://localhost:4000/posts/${id}`, {
    method: "DELETE",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return res;
}

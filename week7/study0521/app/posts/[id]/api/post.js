export async function getPost(id) {
  const res = await fetch(`http://localhost:4000/posts/${id}`);

  return res.json();
}

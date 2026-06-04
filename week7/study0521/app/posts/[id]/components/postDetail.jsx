import { getPost } from "../api/post";

export default async function PostDetail({ postId }) {
  const post = await getPost(postId);

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.author}</div>
      <div>{post.createdAt}</div>
    </div>
  );
}

import PostDetail from "./components/postDetail";

export default async function PostDetailPage({ params }) {
  const { id } = await params;

  //   const post = await getPost(id);
  return (
    // <div>
    //   <div>{post.title}</div>
    //   <div>{post.content}</div>
    //   <div>{post.author}</div>
    //   <div>{post.createdAt}</div>
    // </div>
    <PostDetail postId={id} />
  );
}

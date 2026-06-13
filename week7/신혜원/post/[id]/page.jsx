import PostDetail from "./components/postDetail";

export default async function PostDetailPage({ params }) {
  const { id } = await params;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 min-h-screen bg-white">
      <PostDetail postId={id} />
    </div>
  );
}
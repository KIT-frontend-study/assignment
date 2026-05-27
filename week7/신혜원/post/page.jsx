import { getPosts } from "./api/posts";
import PostCard from "./components/postCard";
import Link from "next/link";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 min-h-screen bg-slate-50/50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">게시물 목록</h1>
          <p className="text-sm text-slate-500 mt-1">포스트 페이지 입니다.</p>
        </div>
        
        <Link 
          href="/post/create" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200"
        >
          새 글 작성하기
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
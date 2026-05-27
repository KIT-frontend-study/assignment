import { getPost } from "../api/post";
import Link from "next/link"; // 뒤로가기 링크 처리를 위해 추가

export default async function PostDetail({ postId }) {
  const post = await getPost(postId);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      
      {/* 뒤로가기 버튼 */}
      <div className="mb-6">
        <Link 
          href="/post" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors group cursor-pointer"
        >
          {/* 왼쪽 화살표 SVG 아이콘 */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          뒤로가기
        </Link>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
        
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-slate-850 tracking-tight mb-4 leading-snug">
          {post.title}
        </h1>
        
        {/* 메타 정보 */}
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-100">
          <span className="font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
            {post.author}
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5">조회수 {post.viewCount || 0}</span>
        </div>
        
        {/* 본문 내용 */}
        <p className="text-slate-600 text-base leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        
      </div>
    </div>
  );
}
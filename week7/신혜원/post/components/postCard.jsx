import Link from "next/link";
import DeletePostButton from "./deletePostButton";

export default function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative pr-16">
      
      {/* 카테고리 배지 */}
      {post.category && (
        <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2">
          {post.category}
        </span>
      )}

      {/* 제목 */}
      <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
        {post.title}
      </h2>
      
      {/* 본문 요약 */}
      <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
        {post.summary || post.content}
      </p>

      {/* 태그 리스트 */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {/* 하단 메타 정보 및 링크 영역 */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2.5 text-xs text-slate-400">
          <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
            {post.author}
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
        
        {/* 자세히 보기를 클릭하면 상세페이지로 이동 */}
        <Link 
          href={`/post/${post.id}`} 
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer z-10"
        >
          자세히 보기 &rarr;
        </Link>
      </div>
      
      {/* 우측 상단 삭제 버튼 */}
      <div className="absolute top-6 right-6 z-10">
        <DeletePostButton postId={post.id} />
      </div>
    </div>
  );
}
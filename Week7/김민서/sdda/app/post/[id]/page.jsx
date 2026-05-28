import { getPost } from "../api/post";
import PostCard from "../components/postCard";

export default async function PostDetailPage({ params }) {
    const { id } = params;
    const post = await getPost(id);

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="text-2xl font-bold">포스트 디테일 페이지입니다.</div>
            <PostCard post={post} />
        </div>
    );
}
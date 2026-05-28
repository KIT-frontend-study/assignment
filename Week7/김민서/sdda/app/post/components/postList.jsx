import PostCard from "./postCard";
import { getPosts } from "../api/post";

export default async function PostList() {
    const posts = await getPosts();

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
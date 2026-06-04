import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/posts" className="border">
        게시판으로 이동
      </Link>
    </div>
  );
}

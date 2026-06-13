import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-black">
      <div>홈 페이지입니다.</div>
      <Link href="/post" className="border">
        포스트 페이지로 이동
      </Link>
    </div>
  );
}

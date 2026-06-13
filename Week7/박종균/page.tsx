import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Board Example</h1>
      <Link href="/post" className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50">
        View posts
      </Link>
    </main>
  );
}
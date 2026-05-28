import Link from "next/link";

export default function Home() {
  return (
    // Full-screen centered layout
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">

      {/* Decorative rings — three concentric circles centered behind the content.
          pointer-events-none means they don't block clicks.
          overflow-hidden on the parent clips them to the screen. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[600, 400, 200].map((size) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-200 opacity-60"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center text-center gap-6">
        <p className="text-xs tracking-widest uppercase text-stone-400 font-medium">
          Welcome
        </p>

        <h1
          className="text-6xl font-bold text-stone-900"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
        >
          I don&apos;t know how any of this works.
        </h1>

        <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
          로컬 게시판입니다, 어케 돌아가는지는 몰라요.
        </p>

        {/* CTA button — arrow nudges right on hover via group-hover */}
        <Link
          href="/posts"
          className="group mt-4 inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium px-7 py-3 rounded-full transition-all duration-200"
        >
          게시판으로 이동
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
"use client";

export function ReportSkeleton() {
  return (
    <article className="w-full max-w-[900px] rounded-2xl border border-[#030f13]/10 bg-white p-6 shadow-lg">
      <div className="mb-4 h-8 w-1/3 animate-pulse rounded bg-zinc-200" />
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-zinc-200" />

      <div className="mt-6 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-[90%] animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-[80%] animate-pulse rounded bg-zinc-200" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-28 animate-pulse rounded-full bg-zinc-200"
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 p-4">
            <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-[85%] animate-pulse rounded bg-zinc-200" />
          </div>
        ))}
      </div>
    </article>
  );
}

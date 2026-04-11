export default function PostSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="mt-6 space-y-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-[1.8rem] border border-orange-100 bg-white/90 p-6"
        >
          {/* Category badge */}
          <div className="flex gap-2">
            <div className="h-6 w-24 rounded-full bg-orange-100" />
            <div className="h-6 w-16 rounded-full bg-orange-50" />
          </div>

          {/* Title */}
          <div className="mt-4 h-6 w-3/4 rounded-lg bg-orange-100" />

          {/* Summary */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded-lg bg-orange-50" />
            <div className="h-4 w-5/6 rounded-lg bg-orange-50" />
          </div>

          {/* Author & date */}
          <div className="mt-5 flex gap-4">
            <div className="h-4 w-20 rounded-lg bg-orange-50" />
            <div className="h-4 w-28 rounded-lg bg-orange-50" />
          </div>

          {/* Reaction bar placeholder */}
          <div className="mt-5 flex gap-2">
            <div className="h-8 w-20 rounded-full bg-orange-50" />
            <div className="h-8 w-20 rounded-full bg-orange-50" />
            <div className="h-8 w-24 rounded-full bg-orange-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

import type { FacilityCategory } from "../data/types";

export function CategoryBadge({ category }: { category: FacilityCategory }) {
  const styles =
    category === "lost"
      ? "bg-red-900/30 text-red-400"
      : "bg-emerald-900/30 text-emerald-400";

  const label = category === "lost" ? "Lost Acoustics" : "Living Acoustics";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs tracking-wider uppercase ${styles}`}
    >
      {label}
    </span>
  );
}

import { Link } from "react-router-dom";
import type { Facility } from "../data/types";
import { CategoryBadge } from "./CategoryBadge";

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link
      to={`/${facility.slug}`}
      className="group block rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 hover:border-neutral-600 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={facility.heroImage}
          alt={facility.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <CategoryBadge category={facility.category} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium text-white">{facility.name}</h3>
        <p className="text-xs text-neutral-500 mt-1">{facility.nameEn}</p>
      </div>
    </Link>
  );
}

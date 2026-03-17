import type { Space } from "../data/types";

interface Props {
  spaces: Space[];
  selectedSpace: Space;
  loading: boolean;
  onSelect: (space: Space) => void;
}

export function SpaceSelector({
  spaces,
  selectedSpace,
  loading,
  onSelect,
}: Props) {
  return (
    <section>
      <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
        空間を選ぶ
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {spaces.map((space) => (
          <button
            key={space.id}
            onClick={() => onSelect(space)}
            className={`rounded-lg border text-left transition-all overflow-hidden ${
              selectedSpace.id === space.id
                ? "border-white/30 ring-1 ring-white/10"
                : "border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <img
              src={space.imagePath}
              alt={space.name}
              className={`w-full h-20 object-cover transition-opacity ${
                selectedSpace.id === space.id ? "opacity-100" : "opacity-50"
              }`}
            />
            <div className="p-3">
              <div className="text-sm font-medium text-white">{space.name}</div>
              <div className="text-xs text-neutral-500 mt-0.5">
                {space.nameEn}
              </div>
            </div>
          </button>
        ))}
      </div>
      {loading && (
        <p className="text-xs text-neutral-500 mt-2 text-center">
          読み込み中...
        </p>
      )}
    </section>
  );
}

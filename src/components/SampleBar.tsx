import type { Sample } from "../data/types";

interface Props {
  samples: Sample[];
  irLoaded: boolean;
  samplePlaying: boolean;
  sampleLoaded: string | null;
  onPlay: (sampleId: string) => void;
}

export function SampleBar({
  samples,
  irLoaded,
  samplePlaying,
  sampleLoaded,
  onPlay,
}: Props) {
  return (
    <section>
      <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4 text-center">
        サンプル音源で聴く
      </h2>
      <div className="flex justify-center gap-4">
        {samples.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onPlay(sample.id)}
            disabled={!irLoaded}
            className={`w-20 h-20 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${
              samplePlaying && sampleLoaded === sample.id
                ? "border-white/30 bg-white/10"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <span className="text-2xl">{sample.icon}</span>
            <span className="text-[10px] text-neutral-400">{sample.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

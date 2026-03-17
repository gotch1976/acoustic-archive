interface Props {
  micActive: boolean;
  irLoaded: boolean;
  onToggle: () => void;
}

export function MicButton({ micActive, irLoaded, onToggle }: Props) {
  return (
    <section className="text-center">
      <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
        この空間の響きを体験する
      </h2>
      <p className="text-xs text-neutral-500 mb-4">
        🎧 イヤホン・ヘッドホンを装着してご体験ください
      </p>

      <button
        onClick={onToggle}
        disabled={!irLoaded}
        className={`w-32 h-32 rounded-full border-2 transition-all flex items-center justify-center mx-auto text-4xl ${
          micActive
            ? "border-red-500 bg-red-500/10 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            : "border-neutral-700 bg-neutral-900 hover:border-neutral-500"
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        🎤
      </button>
      <p className="text-xs text-neutral-500 mt-3">
        {micActive
          ? "マイクON — 声を出してみてください"
          : "タップしてマイクをオンにする"}
      </p>
      {micActive && (
        <p className="text-xs text-neutral-600 mt-1">🎧 ヘッドホン推奨</p>
      )}
    </section>
  );
}

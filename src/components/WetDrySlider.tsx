interface Props {
  wetDry: number;
  onChange: (value: number) => void;
}

export function WetDrySlider({ wetDry, onChange }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
        <span>ドライ</span>
        <span className="text-neutral-400 tabular-nums">
          {Math.round(wetDry * 100)}%
        </span>
        <span>リバーブ</span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={wetDry}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </section>
  );
}

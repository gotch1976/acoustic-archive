import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FACILITIES, DEFAULT_SAMPLES } from "../data/facilities";
import type { Space } from "../data/types";
import { useConvolver } from "../hooks/useConvolver";
import { CategoryBadge } from "../components/CategoryBadge";
import { SpaceSelector } from "../components/SpaceSelector";
import { MicButton } from "../components/MicButton";
import { SampleBar } from "../components/SampleBar";
import { WetDrySlider } from "../components/WetDrySlider";

export function FacilityPage() {
  const { facilitySlug } = useParams<{ facilitySlug: string }>();
  const facility = FACILITIES.find((f) => f.slug === facilitySlug);

  const {
    irLoaded,
    micActive,
    samplePlaying,
    wetDry,
    loadIR,
    startMic,
    stopMic,
    playSample,
    stopSample,
    loadSample,
    setWetDry,
    cleanup,
  } = useConvolver();

  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(false);
  const [sampleLoaded, setSampleLoaded] = useState<string | null>(null);

  const handleSelectSpace = async (space: Space) => {
    setSelectedSpace(space);
    setLoading(true);
    try {
      await loadIR(space.irPath);
    } finally {
      setLoading(false);
    }
  };

  const handleSample = async (sampleId: string) => {
    if (samplePlaying) {
      stopSample();
    }
    if (sampleLoaded !== sampleId) {
      await loadSample(`/samples/${sampleId}.wav`);
      setSampleLoaded(sampleId);
    }
    playSample();
  };

  const handleMic = () => {
    if (micActive) {
      stopMic();
    } else {
      startMic();
    }
  };

  // Load first space on mount
  useEffect(() => {
    if (facility && facility.spaces.length > 0) {
      handleSelectSpace(facility.spaces[0]);
    }
  }, [facility?.slug]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  if (!facility) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-white mb-4">
          施設が見つかりません
        </h1>
        <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
          一覧に戻る
        </Link>
      </main>
    );
  }

  const currentSpace = selectedSpace ?? facility.spaces[0];

  return (
    <main>
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-8 text-center">
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2">
          {facility.name}
        </h1>
        <p className="text-sm text-neutral-500">{facility.nameEn}</p>
        <div className="mt-3">
          <CategoryBadge category={facility.category} />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Hero image - always show facility hero */}
        <section className="relative overflow-hidden rounded-xl">
          <img
            src={facility.heroImage}
            alt={facility.name}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </section>

        <SpaceSelector
          spaces={facility.spaces}
          selectedSpace={currentSpace}
          loading={loading}
          onSelect={handleSelectSpace}
        />

        <MicButton
          micActive={micActive}
          irLoaded={irLoaded}
          onToggle={handleMic}
        />

        <SampleBar
          samples={DEFAULT_SAMPLES}
          irLoaded={irLoaded}
          samplePlaying={samplePlaying}
          sampleLoaded={sampleLoaded}
          onPlay={handleSample}
        />

        <WetDrySlider wetDry={wetDry} onChange={setWetDry} />

        {/* Info */}
        <section className="border-t border-neutral-800 pt-8 text-center space-y-4">
          <p className="text-sm text-neutral-400 leading-relaxed">
            {facility.description}
          </p>
          <p className="text-xs text-neutral-600">
            Impulse Response collected by Acoustic Archive Project
          </p>
        </section>
      </div>
    </main>
  );
}

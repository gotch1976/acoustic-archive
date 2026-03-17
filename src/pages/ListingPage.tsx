import { FACILITIES } from "../data/facilities";
import { FacilityCard } from "../components/FacilityCard";

export function ListingPage() {
  const lost = FACILITIES.filter((f) => f.category === "lost");
  const living = FACILITIES.filter((f) => f.category === "living");

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-3 uppercase">
          Acoustic Archive
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          失われゆく空間、そして今も息づく空間の響きを記録し、体験する
        </p>
      </header>

      {lost.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm uppercase tracking-widest text-red-400/70 mb-6">
            Lost Acoustics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lost.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} />
            ))}
          </div>
        </section>
      )}

      {living.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm uppercase tracking-widest text-emerald-400/70 mb-6">
            Living Acoustics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {living.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

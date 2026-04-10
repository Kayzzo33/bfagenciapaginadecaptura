import { HeroSection } from "@/components/ui/hero-1";
import { VSLSection } from "@/components/ui/vsl-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

function App() {
  return (
    <div className="relative flex w-full min-h-screen flex-col font-sans antialiased selection:bg-brand-yellow selection:text-brand-black">

      {/* ── Pure CSS animated background — no WebGL, no GPU spike ── */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-bg-orb page-bg-orb-1" />
        <div className="page-bg-orb page-bg-orb-2" />
        <div className="page-bg-orb page-bg-orb-3" />
        <div className="page-bg-orb-beam" />
      </div>

      {/* ── Page content ── */}
      <main className="relative z-10 flex grow flex-col items-center">
        <HeroSection />
        <VSLSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}

export default App;

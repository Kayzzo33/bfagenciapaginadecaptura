import { HeroSection } from "@/components/ui/hero-1";
import { VSLSection } from "@/components/ui/vsl-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { useRef } from "react";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex min-h-screen w-full flex-col font-sans antialiased selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden">
      {/* Conteúdo */}
      <main className="relative z-10 flex w-full flex-col items-center">
        
        {/* Unified Wrapper for Hero & VSL */}
        <div ref={containerRef} className="relative w-full">
          
          {/* Background Layer - Absolute so it doesn't push content down */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
            {/* Sticky container that keeps blurs fixed to viewport while inside this section */}
            <div className="sticky top-0 h-screen w-full">
              <div className="page-bg-orb page-bg-orb-1" />
            </div>
          </div>

          {/* Page Content */}
          <div className="relative z-10 w-full flex flex-col items-center">
            <HeroSection />
            <VSLSection />
          </div>
          
          {/* Bottom transition to black - z-0 para ficar atrás do vídeo mas à frente das luzes */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />
        </div>

        <TestimonialsSection />
      </main>
    </div>
  );
}

export default App;
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Google Drive file ID — change only this line to swap the video
const GDRIVE_FILE_ID = "1G69JSJ15yNdMewdMarMp8ZKrdnkLawQ3";
const GDRIVE_EMBED_URL = `https://drive.google.com/file/d/${GDRIVE_FILE_ID}/preview`;

// ─── Component ───────────────────────────────────────────────────────────────
export function VSLSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [showCTA, setShowCTA] = useState(false);
    const [progress, setProgress] = useState(0);

    // ── Scroll-driven tilt animation ─────────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0]);
    const tiltScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const tiltOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

    // ── Simulated progress via elapsed time ──────────────────────────────────
    // The Drive iframe doesn't expose a JS API, so we estimate progress
    // by tracking real time from when the section becomes visible.
    // Adjust ESTIMATED_DURATION_S to match the actual video length.
    const ESTIMATED_DURATION_S = 300; // ← set to your video's duration in seconds
    const startTimeRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);
    const ctaShownRef = useRef(false);

    const tick = useCallback((now: number) => {
        if (startTimeRef.current === null) startTimeRef.current = now;
        const elapsed = (now - startTimeRef.current) / 1000;
        const pct = Math.min((elapsed / ESTIMATED_DURATION_S) * 100, 100);
        setProgress(pct);
        if (pct >= 80 && !ctaShownRef.current) {
            ctaShownRef.current = true;
            setShowCTA(true);
        }
        if (pct < 100) {
            rafRef.current = requestAnimationFrame(tick);
        }
    }, []);

    // ── Start timer when section scrolls into view ────────────────────────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && rafRef.current === null) {
                    rafRef.current = requestAnimationFrame(tick);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            observer.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [tick]);

    return (
        <section
            id="vsl"
            ref={sectionRef}
            className="w-full max-w-6xl mx-auto px-2 sm:px-4 scroll-mt-8"
        >
            {/*
              Perspective container — gives the 3D depth for the tilt.
              The motion.div inside handles the rotateX scroll animation.
            */}
            <div style={{ perspective: "1200px" }}>
                <motion.div
                    style={{
                        rotateX,
                        scale: tiltScale,
                        opacity: tiltOpacity,
                        transformOrigin: "center bottom",
                    }}
                    className={cn(
                        "relative mx-auto w-full select-none",
                    )}
                >
                    {/* Glow behind the tablet */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-brand-yellow/10 blur-3xl scale-90 opacity-50"
                    />

                    <div className="relative w-full">
                        {/*
            ╔═══════════════════════════════════════════════════════╗
            ║   VIDEO POSITION & SIZE — ADJUST THESE 4 VALUES      ║
            ╠═══════════════════════════════════════════════════════╣
            ║                                                       ║
            ║  The Tablet.png is the FULL image: tablet + hands.   ║
            ║  These % offsets map the video to the transparent    ║
            ║  screen area of the tablet inside the full image.    ║
            ║                                                       ║
            ║  top:    distance from top edge   → move video UP/DOWN  ║
            ║  left:   distance from left edge  → move video LEFT   ║
            ║  right:  distance from right edge → move video RIGHT  ║
            ║  bottom: distance from bottom     → controls height   ║
            ║                                                       ║
            ╚═══════════════════════════════════════════════════════╝
          */}
                        <div
                            className="absolute overflow-hidden rounded-[3px] z-0"
                            style={{
                                top: "7.5%",
                                left: "13%",
                                right: "13%",
                                bottom: "28.5%",
                            }}
                        >
                            <div className="relative w-full h-full bg-black">

                                {/* ── Google Drive iframe ── */}
                                <iframe
                                    ref={iframeRef}
                                    src={GDRIVE_EMBED_URL}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="VSL BF Agência"
                                />

                                {/* ── Progress bar ── */}
                                <div className="absolute bottom-2 left-0 right-0 z-10 h-[3px] bg-white/10 pointer-events-none">
                                    <div
                                        className="h-full bg-brand-yellow transition-[width] duration-500 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* ── z-10: Tablet frame — covers the raw video edges ── */}
                        <img
                            src="/imagens/Tablet.png"
                            alt="BF Agência VSL"
                            className="relative z-10 w-full h-auto pointer-events-none"
                            draggable={false}
                        />

                        {/*
                      ── z-20: CTA button — ABOVE the tablet, bottom of screen ──
                    */}
                        {showCTA && (
                            <div
                                className="absolute z-20 flex items-end justify-center pb-5 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ top: "7.5%", left: "13%", right: "13%", bottom: "28.5%" }}
                            >
                                <a
                                    href="#formulario"
                                    className="pointer-events-auto group flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-3 text-brand-black font-bold text-sm shadow-[0_0_30px_rgba(255,193,7,.55)] hover:scale-105 transition-all"
                                >
                                    Quero Aplicar Agora
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-4 group-hover:translate-x-1 transition-transform">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

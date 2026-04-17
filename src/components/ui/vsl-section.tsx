import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function VSLSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [showCTA, setShowCTA] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const nukeVturbCache = () => {
            try {
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
            } catch (e) { }
        };

        nukeVturbCache();
        setTimeout(nukeVturbCache, 500);
        setTimeout(nukeVturbCache, 1500);

        const script = document.createElement("script");
        script.id = "vturb-script";
        script.src = "https://scripts.converteai.net/9dc56156-c977-4315-b1bf-b42deb16f7c8/players/69bc022a891545b57a952ac8/v4/player.js";
        script.async = true;
        document.head.appendChild(script);
    }, []);

    // CONTROLE DO CTA (70% do vídeo)
    useEffect(() => {
        const TARGET_TIME = 114 * 0.7; // ~80s

        const interval = setInterval(() => {
            const player = (window as any).smartplayer?.instances?.[0];
            if (!player) return;

            const video = player.video || player.el?.querySelector('video');
            if (!video) return;

            const current = video.currentTime;

            if (video.duration && video.duration > 0) {
                const p = (current / video.duration) * 100;
                setProgress(p);
            }

            if (current >= TARGET_TIME) {
                setShowCTA(true);
                clearInterval(interval);
            }

        }, 200);

        return () => clearInterval(interval);
    }, []);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
    const rotateXValue = useTransform(scrollYProgress, [0, 0.7], [28, 0]);
    const tiltScaleValue = useTransform(scrollYProgress, [0, 0.7], [0.88, 1]);
    const tiltOpacityValue = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

    return (
        <section
            id="vsl"
            ref={sectionRef}
            className="w-full max-w-[1500px] mx-auto px-4 scroll-mt-8 pb-0 overflow-hidden relative"
        >
            <style>{`
                .smartplayer-mobile-controls, .smartplayer-control-bar, .smartplayer-big-play-button { 
                    color: #FFC107 !important; fill: #FFC107 !important; 
                }
                .smartplayer-progress-bar-played { background-color: #FFC107 !important; }

                .video-responsive-container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    background-color: black;
                    overflow: visible;
                    border-radius: 0.5rem;
                }

                @media (min-width: 768px) {
                    .video-responsive-container {
                        position: absolute;
                        z-index: 0;
                        top: 16.9%;
                        left: 16%;
                        right: 15%;
                        bottom: 28.5%;
                        width: auto;
                        height: auto;
                        aspect-ratio: auto;
                        border-radius: 0;
                    }
                }
            `}</style>

            <div style={{ perspective: "1200px" }}>
                <motion.div
                    style={{
                        rotateX: isMobile ? 0 : rotateXValue,
                        scale: isMobile ? 1 : tiltScaleValue,
                        opacity: isMobile ? 1 : tiltOpacityValue,
                        transformOrigin: "center bottom",
                        marginBottom: "-1px"
                    }}
                    className="relative mx-auto w-full select-none"
                >
                    <div className="relative w-full">
                        <div className="relative w-full">

                            <img
                                src="/imagens/Tablet.png"
                                alt="Tablet"
                                className="hidden md:block relative z-10 w-full h-auto pointer-events-none mx-auto mb-0"
                            />

                            <div className="video-responsive-container shadow-2xl md:shadow-none">
                                <vturb-smartplayer
                                    id="vid-69bc022a891545b57a952ac8"
                                    style={{ display: "block", width: "100%", height: "100%" }}
                                />

                                <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10">
                                    <div
                                        className="h-full bg-[#FFC107] shadow-[0_0_10px_#FFC107]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                {/* ✅ ÚNICO CTA (SEM DUPLICAÇÃO) */}
                                {showCTA && (
                                    <div className="absolute inset-0 z-[999999] flex items-center justify-center pointer-events-none">
                                        <motion.a
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            href="https://wa.me/5511999999999"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pointer-events-auto group flex items-center gap-2 rounded-full bg-brand-yellow px-6 md:px-10 py-3 md:py-4 text-brand-black font-bold shadow-[0_0_50px_rgba(255,193,7,0.9)] hover:scale-110 transition-all text-sm md:text-xl border-2 border-white/40"
                                        >
                                            QUERO APLICAR AGORA
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4} className="size-5 md:size-6 group-hover:translate-x-1 transition-transform">
                                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
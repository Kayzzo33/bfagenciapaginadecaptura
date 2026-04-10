import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

// ─── Slide definitions ────────────────────────────────────────────────────────
// theme: "dark" → phone escuro | "light" → phone branco
const SLIDES = [
    {
        src: "/imagens/WC8qCzssX59NdfSShHoAGam4Gnk.avif",
        phone: "/imagens/eXQvchKBAnCWy4Uulz3LzOVG0U.avif",
        theme: "dark",
    },
    {
        src: "/imagens/WC8qCzssX59NdfSShHoAGam4Gnk (1).avif",
        phone: "/imagens/eXQvchKBAnCWy4Uulz3LzOVG0U.avif",
        theme: "dark",
    },
    {
        src: "/imagens/WC8qCzssX59NdfSShHoAGam4Gnk (2).avif",
        phone: "/imagens/eXQvchKBAnCWy4Uulz3LzOVG0U.avif",
        theme: "dark",
    },
    {
        src: "/imagens/wSvRWp4i7BDnDKfsMPXtPxEniw.avif",
        phone: "/imagens/eXQvchKBAnCWy4Uulz3LzOVG0U.avif",
        theme: "dark",
    },
    {
        src: "/imagens/S3OoEdFMUsv3N5Gt4uQVEFYYxcY.avif",
        phone: "/imagens/eXQvchKBAnCWy4Uulz3LzOVG0U.avif",
        theme: "dark",
    },
    {
        src: "/imagens/7LJWBGyp5xyU24ogYd2x4JjNKk.webp",
        phone: "/imagens/nnA6NO8qYvmiq9Cq8chMmusOM.avif",
        theme: "light",
    },
    {
        src: "/imagens/TFlfmT7eHzu10z2mDFY2us8jErM.avif",
        phone: "/imagens/nnA6NO8qYvmiq9Cq8chMmusOM.avif",
        theme: "light",
    },
] as const;

const N = SLIDES.length;

// ─── Component ────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
    const outerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Scroll progress across the entire tall container (0 → 1)
    const { scrollYProgress } = useScroll({
        target: outerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const idx = Math.min(Math.floor(latest * N), N - 1);
        setCurrentIndex(idx);
    });

    const slide = SLIDES[currentIndex];
    const isDark = slide.theme === "dark";

    return (
        /*
         * Outer div is (N × 100vh) tall — this creates the scroll "fuel".
         * The inner sticky div pins itself to the viewport until the user
         * scrolls through all (N × 100vh) of the outer container.
         */
        <div
            ref={outerRef}
            style={{ height: `${N * 100}vh` }}
            className="relative w-full"
        >
            {/* ── Sticky wrapper ── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* Background — transitions between dark/light */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{ backgroundColor: isDark ? "#000000" : "#f5f5f5" }}
                    transition={{ duration: 0.5 }}
                />

                {/* Section title */}
                <motion.h2
                    animate={{ color: isDark ? "#ffffff" : "#111111" }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl sm:text-4xl font-bold text-center mb-10 px-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Depoimentos
                </motion.h2>

                {/* ── Phone row: prev ghost · main phone · next ghost ── */}
                <div className="flex items-center justify-center gap-4 sm:gap-6">

                    {/* ── Previous ghost (left) ── */}
                    <motion.div
                        className="relative w-[72px] sm:w-[88px] flex-shrink-0 overflow-hidden"
                        animate={{ opacity: currentIndex > 0 ? 0.35 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ pointerEvents: "none" }}
                    >
                        {currentIndex > 0 && (
                            <>
                                <img
                                    src={SLIDES[currentIndex - 1].src}
                                    alt=""
                                    className="absolute object-contain"
                                    style={{ top: "12%", left: "19%", right: "6%", bottom: "8%" }}
                                />
                                <img
                                    src={SLIDES[currentIndex - 1].phone}
                                    alt=""
                                    className="relative w-full h-auto select-none"
                                    draggable={false}
                                />
                            </>
                        )}
                    </motion.div>

                    {/* ── Main phone ── */}
                    <div className="relative w-[240px] sm:w-[290px] md:w-[320px] flex-shrink-0">

                        {/* Screenshot — na frente */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={`shot-${currentIndex}`}
                                src={slide.src}
                                alt={`Depoimento ${currentIndex + 1}`}
                                className="absolute object-contain z-10 rounded-[4%]"
                                style={{
                                    top: "12%",
                                    left: "19%",
                                    right: "6%",
                                    bottom: "8%",
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            />
                        </AnimatePresence>

                        {/* Phone image — atrás do screenshot */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={`phone-${slide.phone}`}
                                src={slide.phone}
                                alt="Phone frame"
                                className="relative z-0 w-full h-auto select-none pointer-events-none"
                                draggable={false}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* ── Next ghost (right) ── */}
                    <motion.div
                        className="relative w-[72px] sm:w-[88px] flex-shrink-0 overflow-hidden"
                        animate={{ opacity: currentIndex < N - 1 ? 0.35 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ pointerEvents: "none" }}
                    >
                        {currentIndex < N - 1 && (
                            <>
                                <img
                                    src={SLIDES[currentIndex + 1].src}
                                    alt=""
                                    className="absolute object-contain"
                                    style={{ top: "12%", left: "19%", right: "6%", bottom: "8%" }}
                                />
                                <img
                                    src={SLIDES[currentIndex + 1].phone}
                                    alt=""
                                    className="relative w-full h-auto select-none"
                                    draggable={false}
                                />
                            </>
                        )}
                    </motion.div>

                </div>

                {/* ── Progress dots ── */}
                <div className="flex gap-2.5 mt-10">
                    {SLIDES.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: i === currentIndex ? 1.4 : 1,
                                opacity: i === currentIndex ? 1 : 0.35,
                                backgroundColor:
                                    i === currentIndex
                                        ? "#FFC107"
                                        : isDark
                                            ? "#ffffff"
                                            : "#333333",
                            }}
                            transition={{ duration: 0.25 }}
                            className="w-2 h-2 rounded-full"
                        />
                    ))}
                </div>

                {/* Scroll hint (only on first slide) */}
                <AnimatePresence>
                    {currentIndex === 0 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="absolute bottom-8 text-xs tracking-widest uppercase"
                            style={{ color: isDark ? "#ffffff" : "#333333" }}
                        >
                            Role para ver mais ↓
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

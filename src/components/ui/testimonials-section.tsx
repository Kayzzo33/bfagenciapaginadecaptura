import { motion } from 'framer-motion';

const images = [
    "/imagens/depoimento1.jpeg",
    "/imagens/depoimento2.jpg",
    "/imagens/depoimento3.jpg",
    "/imagens/depoimento4.jpg",
    "/imagens/depoimento5.jpg"
];

export function TestimonialsSection() {
    return (
        <section className="pt-16 pb-0 relative overflow-hidden bg-black">
            <div className="text-center mb-12 px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    DEPOIMENTOS
                </h2>
            </div>

            <div className="flex w-full overflow-hidden mask-linear-fade">
                <motion.div
                    className="flex gap-8"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ width: "fit-content" }}
                >
                    {[...images, ...images].map((src, i) => (
                        <div
                            key={i}
                            className="w-[280px] md:w-[350px] shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group bg-zinc-900"
                        >
                            <img
                                src={src}
                                alt={`Depoimento ${i}`}
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        </div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
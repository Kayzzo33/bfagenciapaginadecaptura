import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Radial top glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 -top-14 bg-[radial-gradient(35%_70%_at_50%_0%,rgba(255,193,7,.12),transparent)]" />
            </div>

            {/* Vertical line accents */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
                <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-y-0 left-12 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
                <div className="absolute inset-y-0 right-12 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
            </div>

            {/* Outer bold section borders */}
            <div aria-hidden="true" className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-7xl lg:block">
                <div className="absolute inset-y-0 left-0 z-10 h-full w-px bg-white/10" />
                <div className="absolute inset-y-0 right-0 z-10 h-full w-px bg-white/10" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center gap-6 pt-28 pb-20 md:pt-40 md:pb-28">

                {/* Badge */}
                <div className={cn(
                    "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 delay-300 ease-out",
                    "flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-1.5"
                )}>
                    <span className="size-2 rounded-full bg-brand-yellow animate-pulse" />
                    <span className="text-sm font-semibold text-brand-yellow tracking-wider uppercase">Método Exclusivo BF Agência</span>
                </div>

                {/* Headline */}
                <h1 className={cn(
                    "animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards duration-500 delay-100 ease-out",
                    "font-heading text-balance text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl",
                    "[text-shadow:0_0_60px_rgba(255,193,7,.2)]"
                )}>
                    Acelerando Vendas com <br className="hidden md:block" />
                    Tráfego Pago <span className="text-brand-yellow">Inteligente</span>
                </h1>

                {/* Sub-headline */}
                <p className={cn(
                    "animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards duration-500 delay-200 ease-out",
                    "mx-auto max-w-2xl text-center text-lg text-white/60 leading-relaxed md:text-xl"
                )}>
                    Descubra como transformamos tráfego em clientes reais e previsíveis —
                    assista ao vídeo completo abaixo.
                </p>

                {/* Single CTA */}
                <a
                    href="#vsl"
                    className={cn(
                        "animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards duration-500 delay-300 ease-out",
                        "group mt-4 flex items-center gap-3 rounded-full bg-brand-yellow px-10 py-4 text-brand-black font-bold text-lg shadow-[0_0_40px_rgba(255,193,7,.35)]",
                        "transition-all hover:bg-brand-yellow/90 hover:shadow-[0_0_60px_rgba(255,193,7,.55)] hover:scale-[1.03]"
                    )}
                >
                    Assistir ao Vídeo Agora
                    <ArrowDownIcon className="size-5 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
            </div>
        </section>
    );
}

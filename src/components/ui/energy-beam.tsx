import { useEffect, useRef } from 'react';

interface EnergyBeamProps {
    projectId?: string;
    className?: string;
}

declare global {
    interface Window {
        UnicornStudio?: { init: () => void };
    }
}

export function EnergyBeam({
    projectId = "hRFfUymDGOHwtFe7evR2",
    className = "",
}: EnergyBeamProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        if (scriptLoadedRef.current) return;

        // If script already in DOM (e.g. HMR), just re-init
        if (window.UnicornStudio) {
            scriptLoadedRef.current = true;
            window.UnicornStudio.init();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js';
        script.async = true;
        script.onload = () => {
            scriptLoadedRef.current = true;
            window.UnicornStudio?.init();
        };

        document.head.appendChild(script);
        return () => {
            script.parentNode?.removeChild(script);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            data-us-project={projectId}
            className={`w-full h-full ${className}`}
        />
    );
}

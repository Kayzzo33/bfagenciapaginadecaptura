'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    const links = [
        {
            label: 'Serviços',
            href: '#servicos',
        },
        {
            label: 'Resultados',
            href: '#resultados',
        },
        {
            label: 'Sobre Nós',
            href: '#sobre',
        },
    ];

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={cn('sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300', {
                'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
                    scrolled,
            })}
        >
            <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="hover:bg-accent rounded-md p-2 transition-colors">
                    <img src="https://res.cloudinary.com/djpdiwdxt/image/upload/v1764784701/logo_bf_hero_bcswa7.png" alt="BF Agência Logo" className="h-8 md:h-10 auto object-contain" />
                </div>
                <div className="hidden items-center gap-6 md:flex">
                    {links.map((link) => (
                        <a key={link.label} className={cn(buttonVariants({ variant: 'ghost' }), 'text-base font-medium')} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                    <Button variant="outline" className="ml-4">Fale Conosco</Button>
                    <Button>Aplicar Agora</Button>
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    <MenuToggleIcon open={open} className="size-6 text-brand-yellow" duration={300} />
                </Button>
            </nav>
            <MobileMenu open={open} className="flex flex-col justify-between gap-4">
                <div className="grid gap-y-4 mt-8">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={cn(buttonVariants({
                                variant: 'ghost',
                                className: 'justify-start text-lg',
                            }))}
                            href={link.href}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col gap-4 mb-8">
                    <Button variant="outline" className="w-full bg-transparent text-lg py-6">
                        Fale Conosco
                    </Button>
                    <Button className="w-full text-lg py-6">Aplicar Agora</Button>
                </div>
            </MobileMenu>
        </header>
    );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
    open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-xl',
                'fixed top-20 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-border md:hidden',
            )}
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className={cn(
                    'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 ease-out duration-300',
                    'size-full p-6',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}

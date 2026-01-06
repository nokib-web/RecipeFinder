'use client';

import Link from 'next/link';

import { UtensilsCrossed, Search, Heart, ShoppingBag, Calendar, Trophy, ChefHat, Menu, X, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Navbar() {
    const pathname = usePathname();
    const [isCookingMode, setIsCookingMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('cooking-mode');
        if (saved === 'true') {
            setIsCookingMode(true);
            document.documentElement.classList.add('cooking-mode');
        }
    }, []);

    const toggleCookingMode = () => {
        const newState = !isCookingMode;
        setIsCookingMode(newState);
        localStorage.setItem('cooking-mode', String(newState));
        if (newState) {
            document.documentElement.classList.add('cooking-mode');
        } else {
            document.documentElement.classList.remove('cooking-mode');
        }
    };

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Explore', href: '/search', icon: Search },
        { name: 'Favorites', href: '/favorites', icon: Heart },
        { name: 'Shopping List', href: '/shopping-list', icon: ShoppingBag },
        { name: 'Meal Planner', href: '/planner', icon: Calendar },
        { name: 'Achievements', href: '/achievements', icon: Trophy },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="lg:hidden p-2 hover:bg-foreground/5 rounded-xl text-foreground/60 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-primary p-2 rounded-xl text-primary-foreground group-hover:rotate-12 transition-transform">
                                <UtensilsCrossed size={24} />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Recipe<span className="text-primary">Finder</span></span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                                        ? "text-primary"
                                        : "text-foreground/60"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 sm:gap-4">
                        <button
                            onClick={toggleCookingMode}
                            className={cn(
                                "p-2.5 rounded-full transition-all duration-500",
                                isCookingMode
                                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                    : "hover:bg-foreground/5 text-foreground/60"
                            )}
                            title="Toggle Cooking Mode"
                        >
                            <ChefHat size={20} className={cn(isCookingMode && "animate-pulse")} />
                        </button>

                        <Link
                            href="/search"
                            className="p-2.5 rounded-full hover:bg-foreground/5 text-foreground/60 transition-colors"
                        >
                            <Search size={20} />
                        </Link>

                        <Link
                            href="/favorites"
                            className={cn(
                                "p-2.5 rounded-full transition-colors hidden sm:flex",
                                pathname === "/favorites" ? "bg-primary/10 text-primary" : "hover:bg-foreground/5 text-foreground/60"
                            )}
                        >
                            <Heart size={20} fill={pathname === "/favorites" ? "currentColor" : "none"} />
                        </Link>

                        <button className="hidden sm:block ml-2 px-6 py-2.5 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-colors">
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[300px] bg-card border-r border-border z-[70] p-6 lg:hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 group">
                                    <div className="bg-primary p-2 rounded-xl text-primary-foreground">
                                        <UtensilsCrossed size={20} />
                                    </div>
                                    <span className="text-lg font-bold">Recipe<span className="text-primary">Finder</span></span>
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 hover:bg-foreground/5 rounded-xl text-foreground/60 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all",
                                            (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                : "text-foreground/60 hover:bg-foreground/5"
                                        )}
                                    >
                                        {link.icon && <link.icon size={20} />}
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="absolute bottom-8 left-6 right-6 space-y-4">
                                <button
                                    onClick={toggleCookingMode}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-4 rounded-2xl font-bold transition-all",
                                        isCookingMode
                                            ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                                            : "bg-foreground/5 text-foreground/60"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <ChefHat size={20} />
                                        Cooking Mode
                                    </div>
                                    <div className={cn(
                                        "w-10 h-5 rounded-full relative transition-colors",
                                        isCookingMode ? "bg-white/30" : "bg-foreground/20"
                                    )}>
                                        <div className={cn(
                                            "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                                            isCookingMode ? "right-1" : "left-1"
                                        )} />
                                    </div>
                                </button>
                                <button className="w-full px-6 py-4 bg-foreground text-background rounded-2xl font-bold hover:bg-foreground/90 transition-all shadow-xl">
                                    Sign In
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>


    );
}

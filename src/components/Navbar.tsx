'use client';

import Link from 'next/link';
import { UtensilsCrossed, Search, Heart, ShoppingBag, Calendar, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';



export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-xl text-primary-foreground group-hover:rotate-12 transition-transform">
                        <UtensilsCrossed size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Recipe<span className="text-primary">Finder</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/" ? "text-primary" : "text-foreground/60"
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href="/search"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname.startsWith("/search") ? "text-primary" : "text-foreground/60"
                        )}
                    >
                        Explore
                    </Link>
                    <Link
                        href="/favorites"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/favorites" ? "text-primary" : "text-foreground/60"
                        )}
                    >
                        Favorites
                    </Link>
                    <Link
                        href="/shopping-list"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/shopping-list" ? "text-primary" : "text-foreground/60"
                        )}
                    >
                        Shopping List
                    </Link>
                    <Link
                        href="/planner"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/planner" ? "text-primary" : "text-foreground/60"
                        )}
                    >
                        Meal Planner
                    </Link>
                    <Link
                        href="/achievements"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/achievements" ? "text-primary" : "text-foreground/60"
                        )}
                    >
                        Achievements
                    </Link>

                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/search"
                        className="p-2.5 rounded-full hover:bg-foreground/5 text-foreground/60 transition-colors"
                    >
                        <Search size={20} />
                    </Link>
                    <Link
                        href="/planner"
                        className={cn(
                            "p-2.5 rounded-full transition-colors",
                            pathname === "/planner" ? "bg-primary/10 text-primary" : "hover:bg-foreground/5 text-foreground/60"
                        )}
                    >
                        <Calendar size={20} fill={pathname === "/planner" ? "currentColor" : "none"} />
                    </Link>
                    <Link
                        href="/shopping-list"
                        className={cn(
                            "p-2.5 rounded-full transition-colors",
                            pathname === "/shopping-list" ? "bg-primary/10 text-primary" : "hover:bg-foreground/5 text-foreground/60"
                        )}
                    >
                        <ShoppingBag size={20} />
                    </Link>

                    <Link
                        href="/favorites"
                        className={cn(
                            "p-2.5 rounded-full transition-colors",
                            pathname === "/favorites" ? "bg-primary/10 text-primary" : "hover:bg-foreground/5 text-foreground/60"
                        )}
                    >
                        <Heart size={20} fill={pathname === "/favorites" ? "currentColor" : "none"} />
                    </Link>

                    <Link
                        href="/achievements"
                        className={cn(
                            "p-2.5 rounded-full transition-colors",
                            pathname === "/achievements" ? "bg-primary/10 text-primary" : "hover:bg-foreground/5 text-foreground/60"
                        )}
                    >
                        <Trophy size={20} fill={pathname === "/achievements" ? "currentColor" : "none"} />
                    </Link>


                    <button className="hidden sm:block ml-2 px-6 py-2.5 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-colors">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
}

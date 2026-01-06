'use client';

import { useFavorites } from "@/lib/useFavorites";
import RecipeCard from "@/components/RecipeCard";
import { Heart, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen py-12 px-4 md:px-8 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                            <Heart size={32} fill="currentColor" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            My Saved <span className="text-primary">Recipes</span>
                        </h1>
                    </div>
                    <p className="text-foreground/60 text-lg">
                        Your personal collection of favorite culinary masterpieces.
                    </p>
                </header>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favorites.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe as any} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-card border border-dashed border-border rounded-[3rem]">
                        <div className="inline-flex items-center justify-center p-6 bg-foreground/5 rounded-full mb-6">
                            <Search size={48} className="text-foreground/20" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
                        <p className="text-foreground/50 mb-10 max-w-sm mx-auto text-lg">
                            Start exploring and save the recipes you love to find them easily later.
                        </p>
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                        >
                            Explore Recipes
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

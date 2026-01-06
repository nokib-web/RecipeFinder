'use client';

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/useFavorites";
import { RecipeSummary } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
    recipe: RecipeSummary;
    className?: string;
}

export default function FavoriteButton({ recipe, className }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(recipe.id);

    return (
        <button
            onClick={() => toggleFavorite(recipe)}
            className={cn(
                "p-3 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg",
                favorited
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/20 text-white hover:bg-white/30",
                className
            )}
        >
            <Heart size={24} fill={favorited ? "currentColor" : "none"} />
        </button>
    );
}

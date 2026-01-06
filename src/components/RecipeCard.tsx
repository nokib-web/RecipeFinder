'use client';

import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Utensils, Heart } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { useFavorites } from "@/lib/useFavorites";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(recipe.id);

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            imageType: recipe.imageType
        });
    };

    return (
        <Link href={`/recipe/${recipe.id}`} className="group">
            <div className="bg-card rounded-3xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={handleFavorite}
                            className={cn(
                                "p-2 rounded-xl backdrop-blur-md transition-all duration-300",
                                favorited
                                    ? "bg-primary text-primary-foreground shadow-lg"
                                    : "bg-background/80 text-foreground/60 hover:text-primary hover:bg-white"
                            )}
                        >
                            <Heart size={18} fill={favorited ? "currentColor" : "none"} />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Clock size={14} className="text-primary" />
                        {recipe.readyInMinutes} min
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {recipe.diets?.slice(0, 2).map((diet) => (
                            <span
                                key={diet}
                                className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary"
                            >
                                {diet}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                        {recipe.title}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-foreground/60 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Users size={16} />
                            <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary font-medium">
                            <span>View Recipe</span>
                            <Utensils size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}


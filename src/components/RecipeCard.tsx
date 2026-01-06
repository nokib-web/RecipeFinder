'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Utensils, Heart, Eye, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { useFavorites } from "@/lib/useFavorites";
import { useShoppingList } from "@/lib/useShoppingList";
import { getRecipeDetails } from "@/lib/spoonacular";
import { cn } from "@/lib/utils";
import QuickView from "./QuickView";


interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addMultiple } = useShoppingList();
    const [quickViewId, setQuickViewId] = useState<number | null>(null);
    const [addingList, setAddingList] = useState(false);
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

    const handleQuickShop = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAddingList(true);
        try {
            const details = await getRecipeDetails(recipe.id);
            if (details.extendedIngredients) {
                const items = details.extendedIngredients.map(ing => ({
                    name: ing.name,
                    amount: ing.original,
                    recipeTitle: recipe.title
                }));
                addMultiple(items as any);
                setTimeout(() => setAddingList(false), 2000);
            }
        } catch (err) {
            console.error(err);
            setAddingList(false);
        }
    };

    return (
        <>
            <Link href={`/recipe/${recipe.id}`} className="group">
                <div className="bg-card rounded-3xl overflow-hidden border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full relative">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
                            <button
                                onClick={handleFavorite}
                                className={cn(
                                    "p-2 rounded-xl backdrop-blur-md transition-all duration-300 shadow-lg",
                                    favorited
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background/80 text-foreground/60 hover:text-primary hover:bg-white",
                                    // Keep favorited visible
                                    favorited && "opacity-100 translate-x-0"
                                )}
                            >
                                <Heart size={18} fill={favorited ? "currentColor" : "none"} />
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewId(recipe.id); }}
                                className="p-2 bg-background/80 text-foreground/60 hover:text-primary hover:bg-white rounded-xl backdrop-blur-md transition-all duration-300 shadow-lg"
                            >
                                <Eye size={18} />
                            </button>
                            <button
                                onClick={handleQuickShop}
                                disabled={addingList}
                                className={cn(
                                    "p-2 rounded-xl backdrop-blur-md transition-all duration-300 shadow-lg",
                                    addingList
                                        ? "bg-green-500 text-white"
                                        : "bg-background/80 text-foreground/60 hover:text-primary hover:bg-white"
                                )}
                            >
                                {addingList ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />}
                            </button>
                        </div>

                        {/* Always visible favorite if favorited */}
                        {favorited && (
                            <div className="absolute top-4 right-4 group-hover:hidden transition-all">
                                <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-lg">
                                    <Heart size={18} fill="currentColor" />
                                </div>
                            </div>
                        )}

                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {recipe.healthScore > 0 && (
                                <div className="bg-green-500/90 text-white backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                    Score: {recipe.healthScore}
                                </div>
                            )}
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

            <QuickView
                recipeId={recipe.id}
                isOpen={quickViewId === recipe.id}
                onClose={() => setQuickViewId(null)}
            />
        </>
    );
}



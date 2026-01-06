'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Flame, ShoppingCart, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getRecipeDetails } from '@/lib/spoonacular';
import { Recipe } from '@/types/recipe';
import { useShoppingList } from '@/lib/useShoppingList';
import { cn } from '@/lib/utils';

interface QuickViewProps {
    recipeId: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickView({ recipeId, isOpen, onClose }: QuickViewProps) {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [addedAll, setAddedAll] = useState(false);
    const { addMultiple } = useShoppingList();

    useEffect(() => {
        if (isOpen && recipeId) {
            setLoading(true);
            getRecipeDetails(recipeId)
                .then(setRecipe)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [isOpen, recipeId]);

    const handleAddAll = () => {
        if (recipe && recipe.extendedIngredients) {
            const items = recipe.extendedIngredients.map(ing => ({
                name: ing.name,
                amount: ing.original,
                recipeTitle: recipe.title
            }));
            addMultiple(items as any);
            setAddedAll(true);
            setTimeout(() => setAddedAll(false), 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 bg-background/80 hover:bg-white backdrop-blur-md rounded-full text-foreground/40 hover:text-primary transition-all"
                        >
                            <X size={20} />
                        </button>

                        {loading ? (
                            <div className="flex-grow flex items-center justify-center py-24">
                                <Loader2 className="animate-spin text-primary" size={48} />
                            </div>
                        ) : recipe ? (
                            <>
                                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                                    <div className="absolute bottom-6 left-6 md:hidden">
                                        <h2 className="text-2xl font-bold text-white mb-2">{recipe.title}</h2>
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1 text-white/80 text-sm font-medium">
                                                <Clock size={16} className="text-primary" /> {recipe.readyInMinutes}m
                                            </span>
                                            <span className="flex items-center gap-1 text-white/80 text-sm font-medium">
                                                <Users size={16} className="text-primary" /> {recipe.servings}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow p-8 md:p-12 overflow-y-auto">
                                    <div className="hidden md:block mb-8">
                                        <h2 className="text-3xl font-extrabold mb-4 leading-tight">{recipe.title}</h2>
                                        <div className="flex gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest font-black text-foreground/40">Time</span>
                                                <span className="font-bold flex items-center gap-1"><Clock size={14} className="text-primary" /> {recipe.readyInMinutes}m</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest font-black text-foreground/40">Servings</span>
                                                <span className="font-bold flex items-center gap-1"><Users size={14} className="text-primary" /> {recipe.servings}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest font-black text-foreground/40">Health</span>
                                                <span className="font-bold flex items-center gap-1"><Flame size={14} className="text-primary" /> {recipe.healthScore}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                Ingredients
                                                <span className="text-xs font-normal text-foreground/40">({recipe.extendedIngredients.length} items)</span>
                                            </h3>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                                {recipe.extendedIngredients.slice(0, 10).map((ing, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/60 capitalize">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                        {ing.name}
                                                    </li>
                                                ))}
                                                {recipe.extendedIngredients.length > 10 && (
                                                    <li className="text-sm text-primary font-bold italic">+ {recipe.extendedIngredients.length - 10} more...</li>
                                                )}
                                            </ul>

                                            <button
                                                onClick={handleAddAll}
                                                disabled={addedAll}
                                                className={cn(
                                                    "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all",
                                                    addedAll
                                                        ? "bg-green-500 text-white"
                                                        : "bg-primary/10 text-primary hover:bg-primary/20"
                                                )}
                                            >
                                                {addedAll ? (
                                                    <><CheckCircle2 size={20} /> Added to Shopping List!</>
                                                ) : (
                                                    <><ShoppingCart size={20} /> Add All Ingredients to List</>
                                                )}
                                            </button>
                                        </div>

                                        <div className="pt-8 border-t border-border">
                                            <Link
                                                href={`/recipe/${recipe.id}`}
                                                onClick={onClose}
                                                className="flex items-center justify-between group p-6 bg-foreground text-background rounded-[2rem] font-bold text-xl hover:bg-foreground/90 transition-all"
                                            >
                                                View Full Instructions
                                                <div className="bg-background/20 p-2 rounded-full group-hover:translate-x-2 transition-transform">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-12 text-center">Failed to load recipe content.</div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { getSimilarRecipes } from '@/lib/spoonacular';
import { RecipeSummary } from '@/types/recipe';
import RecipeCard from './RecipeCard';
import { Sprout, Loader2 } from 'lucide-react';

interface PairingSuggestionsProps {
    recipeId: number;
}

export default function PairingSuggestions({ recipeId }: PairingSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (recipeId) {
            setLoading(true);
            getSimilarRecipes(recipeId)
                .then(setSuggestions)
                .catch((err) => {
                    console.error("Pairing suggestions failed:", err);
                    setSuggestions([]);
                })
                .finally(() => setLoading(false));
        }
    }, [recipeId]);


    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <Sprout size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Intelligent Pairings</h2>
                    <p className="text-foreground/50">Complement your meal with these suggestions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {suggestions.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe as any} />
                ))}
            </div>
        </div>
    );
}

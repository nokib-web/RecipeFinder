'use client';

import { useState, useEffect } from 'react';
import { RecipeSummary } from '@/types/recipe';
import { useAchievements } from './useAchievements';

export function useFavorites() {
    const [favorites, setFavorites] = useState<RecipeSummary[]>([]);
    const { updateFavoriteCount } = useAchievements();

    useEffect(() => {
        const saved = localStorage.getItem('recipe-favorites');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFavorites(parsed);
                updateFavoriteCount(parsed.length);
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, [updateFavoriteCount]);

    const toggleFavorite = (recipe: RecipeSummary) => {
        setFavorites(prev => {
            const isFav = prev.some(f => f.id === recipe.id);
            let next;
            if (isFav) {
                next = prev.filter(f => f.id !== recipe.id);
            } else {
                next = [...prev, recipe];
            }
            localStorage.setItem('recipe-favorites', JSON.stringify(next));
            updateFavoriteCount(next.length);
            return next;
        });
    };


    const isFavorite = (id: number) => {
        return favorites.some(f => f.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}

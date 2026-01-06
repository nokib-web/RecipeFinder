'use client';

import { useState, useEffect } from 'react';
import { RecipeSummary } from '@/types/recipe';

export function useFavorites() {
    const [favorites, setFavorites] = useState<RecipeSummary[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('recipe-favorites');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    const toggleFavorite = (recipe: RecipeSummary) => {
        setFavorites(prev => {
            const isFavorite = prev.some(f => f.id === recipe.id);
            let next;
            if (isFavorite) {
                next = prev.filter(f => f.id !== recipe.id);
            } else {
                next = [...prev, recipe];
            }
            localStorage.setItem('recipe-favorites', JSON.stringify(next));
            return next;
        });
    };

    const isFavorite = (id: number) => {
        return favorites.some(f => f.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}

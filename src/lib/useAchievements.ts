'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    requirement: number;
    type: 'cooked_count' | 'favorite_count' | 'planner_count';
}

const ACHIEVEMENTS: Achievement[] = [
    { id: 'novice_chef', title: 'Novice Chef', description: 'Cook your first 1 recipe.', icon: '🍳', requirement: 1, type: 'cooked_count' },
    { id: 'home_cook', title: 'Home Cook', description: 'Cook 5 recipes.', icon: '🏠', requirement: 5, type: 'cooked_count' },
    { id: 'culinary_artist', title: 'Culinary Artist', description: 'Cook 10 recipes.', icon: '🎨', requirement: 10, type: 'cooked_count' },
    { id: 'master_chef', title: 'Master Chef', description: 'Cook 25 recipes.', icon: '👨‍🍳', requirement: 25, type: 'cooked_count' },
    { id: 'social_butterfly', title: 'Recipe Collector', description: 'Save 10 favorite recipes.', icon: '🦋', requirement: 10, type: 'favorite_count' },
    { id: 'planner_pro', title: 'Planner Pro', description: 'Add 7 meals to your weekly planner.', icon: '📅', requirement: 7, type: 'planner_count' },
];

export function useAchievements() {
    const [stats, setStats] = useState({ cooked_count: 0, favorite_count: 0, planner_count: 0 });
    const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

    useEffect(() => {
        const savedStats = localStorage.getItem('recipe-stats');
        const savedUnlocked = localStorage.getItem('recipe-unlocked-achievements');

        if (savedStats) setStats(JSON.parse(savedStats));
        if (savedUnlocked) setUnlockedIds(JSON.parse(savedUnlocked));
    }, []);

    const checkAchievements = useCallback((currentStats: typeof stats, currentUnlocked: string[]) => {
        const newUnlocked = ACHIEVEMENTS.filter(a =>
            !currentUnlocked.includes(a.id) && currentStats[a.type] >= a.requirement
        ).map(a => a.id);

        if (newUnlocked.length > 0) {
            const updatedUnlocked = [...currentUnlocked, ...newUnlocked];
            setUnlockedIds(updatedUnlocked);
            localStorage.setItem('recipe-unlocked-achievements', JSON.stringify(updatedUnlocked));
            return newUnlocked;
        }
        return [];
    }, []);

    const saveStats = useCallback((newStats: typeof stats) => {
        setStats(newStats);
        localStorage.setItem('recipe-stats', JSON.stringify(newStats));

        // Use functional state or local variable to avoid stale closures
        setUnlockedIds(prev => {
            checkAchievements(newStats, prev);
            return prev;
        });
    }, [checkAchievements]);

    const incrementCooked = useCallback(() => {
        setStats(prev => {
            const next = { ...prev, cooked_count: prev.cooked_count + 1 };
            localStorage.setItem('recipe-stats', JSON.stringify(next));
            setUnlockedIds(u => {
                checkAchievements(next, u);
                return u;
            });
            return next;
        });
    }, [checkAchievements]);

    const updateFavoriteCount = useCallback((count: number) => {
        setStats(prev => {
            if (prev.favorite_count === count) return prev;
            const next = { ...prev, favorite_count: count };
            localStorage.setItem('recipe-stats', JSON.stringify(next));
            setUnlockedIds(u => {
                checkAchievements(next, u);
                return u;
            });
            return next;
        });
    }, [checkAchievements]);

    const updatePlannerCount = useCallback((count: number) => {
        setStats(prev => {
            if (prev.planner_count === count) return prev;
            const next = { ...prev, planner_count: count };
            localStorage.setItem('recipe-stats', JSON.stringify(next));
            setUnlockedIds(u => {
                checkAchievements(next, u);
                return u;
            });
            return next;
        });
    }, [checkAchievements]);

    return {
        stats,
        unlockedIds,
        achievements: ACHIEVEMENTS,
        incrementCooked,
        updateFavoriteCount,
        updatePlannerCount
    };
}

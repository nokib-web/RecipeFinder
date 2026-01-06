'use client';

import { useState, useEffect } from 'react';
import { useAchievements } from './useAchievements';
import { RecipeSummary } from '@/types/recipe';

export interface PlannedMeal {
    id: string;
    recipeId: number;
    title: string;
    image: string;
    day: string; // 'Monday', 'Tuesday', etc.
    mealType: string; // 'Breakfast', 'Lunch', 'Dinner'
}

export function useMealPlanner() {
    const [planner, setPlanner] = useState<PlannedMeal[]>([]);
    const { updatePlannerCount } = useAchievements();

    useEffect(() => {
        const saved = localStorage.getItem('recipe-meal-planner');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setPlanner(parsed);
                updatePlannerCount(parsed.length);
            } catch (e) {
                console.error("Failed to parse meal planner", e);
            }
        }
    }, [updatePlannerCount]);


    const save = (newPlanner: PlannedMeal[]) => {
        setPlanner(newPlanner);
        localStorage.setItem('recipe-meal-planner', JSON.stringify(newPlanner));
        updatePlannerCount(newPlanner.length);
    };


    const addMeal = (meal: Omit<PlannedMeal, 'id'>) => {
        const newMeal = { ...meal, id: `${Date.now()}-${meal.recipeId}` };
        save([...planner, newMeal]);
    };

    const removeMeal = (id: string) => {
        save(planner.filter(m => m.id !== id));
    };

    const clearPlanner = () => {
        save([]);
    };

    return { planner, addMeal, removeMeal, clearPlanner };
}

'use client';

import { useState } from 'react';
import { Calendar, Check, ChefHat, X } from 'lucide-react';
import { useMealPlanner } from '@/lib/useMealPlanner';
import { cn } from '@/lib/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

interface AddToPlannerProps {
    recipe: {
        id: number;
        title: string;
        image: string;
    };
}

export default function AddToPlanner({ recipe }: AddToPlannerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { addMeal } = useMealPlanner();
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [selectedMeal, setSelectedMeal] = useState('Dinner');
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addMeal({
            recipeId: recipe.id,
            title: recipe.title,
            image: recipe.image,
            day: selectedDay,
            mealType: selectedMeal,
        });
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            setIsOpen(false);
        }, 1500);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl font-semibold hover:bg-foreground/5 transition-all text-sm"
            >
                <Calendar size={18} className="text-primary" />
                Add to Planner
            </button>

            {isOpen && (
                <div className="absolute top-full mt-4 right-0 w-72 bg-card border border-border rounded-[2rem] shadow-2xl p-6 z-[60] animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <ChefHat size={18} className="text-primary" />
                            Plan this meal
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-foreground/20 hover:text-foreground/60">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/40 mb-2 block">Select Day</label>
                            <div className="grid grid-cols-4 gap-1">
                                {DAYS.map(day => (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={cn(
                                            "p-1.5 text-[10px] rounded-lg font-bold transition-all",
                                            selectedDay === day ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
                                        )}
                                    >
                                        {day.substring(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-wider font-bold text-foreground/40 mb-2 block">Meal Type</label>
                            <div className="flex flex-wrap gap-2">
                                {MEAL_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedMeal(type)}
                                        className={cn(
                                            "px-3 py-1.5 text-xs rounded-lg font-bold transition-all flex-grow text-center",
                                            selectedMeal === type ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={isAdded}
                            className={cn(
                                "w-full py-3 rounded-xl font-bold transition-all mt-4 flex items-center justify-center gap-2",
                                isAdded ? "bg-green-500 text-white" : "bg-foreground text-background hover:bg-foreground/90"
                            )}
                        >
                            {isAdded ? (
                                <><Check size={18} /> Added!</>
                            ) : (
                                "Save to Planner"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

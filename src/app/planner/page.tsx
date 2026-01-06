'use client';

import { useMealPlanner, PlannedMeal } from "@/lib/useMealPlanner";
import { Calendar, Trash2, ChefHat, ArrowLeft, Clock, FileDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlannerPage() {
    const { planner, removeMeal, clearPlanner } = useMealPlanner();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen py-12 px-4 md:px-8 lg:px-24 bg-background">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Find more recipes
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Calendar size={32} />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                    Meal <span className="text-primary">Planner</span>
                                </h1>
                            </div>
                            <p className="text-foreground/60 text-lg">
                                Organize your culinary week with ease.
                            </p>
                        </div>

                        {planner.length > 0 && (
                            <div className="flex gap-3 no-print">
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold transition-all shadow-lg hover:bg-primary/90"
                                >
                                    <FileDown size={20} />
                                    Download PDF
                                </button>
                                <button
                                    onClick={clearPlanner}
                                    className="px-6 py-3 text-sm font-bold bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all"
                                >
                                    Reset Week
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {planner.length > 0 ? (
                    <div className="grid grid-cols-1 gap-12 planner-grid">

                        {DAYS.map(day => {
                            const dayMeals = planner.filter(m => m.day === day);
                            if (dayMeals.length === 0) return null;

                            return (
                                <section key={day} className="space-y-6 day-section">
                                    <h2 className="text-2xl font-bold flex items-center gap-3 border-l-4 border-primary pl-4">
                                        {day}
                                        <span className="text-sm font-normal text-foreground/40 bg-foreground/5 px-3 py-1 rounded-full">
                                            {dayMeals.length} meals planned
                                        </span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {dayMeals.map((meal) => (
                                            <div key={meal.id} className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                                                <div className="relative aspect-video">
                                                    <Image src={meal.image} alt={meal.title} fill className="object-cover" />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                                                            {meal.mealType}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeMeal(meal.id)}
                                                        className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all backdrop-blur-md"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-bold text-lg line-clamp-1 mb-4">{meal.title}</h3>
                                                    <Link
                                                        href={`/recipe/${meal.recipeId}`}
                                                        className="flex items-center justify-center gap-2 w-full py-3 bg-foreground/5 hover:bg-primary hover:text-primary-foreground rounded-xl font-bold transition-all text-sm no-print"
                                                    >
                                                        <ChefHat size={16} />
                                                        View Recipe
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-card border border-dashed border-border rounded-[3rem]">
                        <div className="inline-flex items-center justify-center p-6 bg-foreground/5 rounded-full mb-6">
                            <Calendar size={48} className="text-foreground/10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your week is a blank canvas</h2>
                        <p className="text-foreground/50 mb-10 max-w-sm mx-auto text-lg">
                            Pick your favorite recipes and assign them to days to start planning your perfect week.
                        </p>
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg"
                        >
                            Start Planning
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

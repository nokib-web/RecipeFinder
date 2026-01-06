'use client';

import { useShoppingList } from "@/lib/useShoppingList";
import { Trash2, CheckCircle2, Circle, ShoppingBag, ArrowLeft, Plus, CheckSquare, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShoppingListPage() {
    const { items, toggleItem, removeItem, clearCompleted, checkAll, clearAll } = useShoppingList();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const completedCount = items.filter(i => i.completed).length;

    return (
        <main className="min-h-screen py-12 px-4 md:px-8 lg:px-24 bg-background">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Continue Browsing
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <ShoppingBag size={32} />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                    Shopping <span className="text-primary">List</span>
                                </h1>
                            </div>
                            <p className="text-foreground/60 text-lg">
                                {items.length === 0
                                    ? "Your list is empty. Start adding ingredients from recipes!"
                                    : `You have ${items.length} items to pick up.`}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {items.length > 0 && completedCount < items.length && (
                                <button
                                    onClick={checkAll}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all"
                                >
                                    <CheckSquare size={18} />
                                    Check All
                                </button>
                            )}
                            {completedCount > 0 && (
                                <button
                                    onClick={clearCompleted}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                                >
                                    <Trash2 size={18} />
                                    Clear Completed
                                </button>
                            )}
                            {items.length > 0 && (
                                <button
                                    onClick={clearAll}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-bold bg-foreground/5 hover:bg-foreground/10 rounded-2xl transition-all"
                                >
                                    <Trash size={18} />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </header>


                {items.length > 0 ? (
                    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl">
                        <div className="divide-y divide-border/50">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-4 p-6 transition-all hover:bg-foreground/[0.02] ${item.completed ? "opacity-50" : ""
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className={`shrink-0 transition-colors ${item.completed ? "text-green-500" : "text-foreground/20 hover:text-primary"
                                            }`}
                                    >
                                        {item.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                                    </button>

                                    <div className="flex-grow">
                                        <p className={`text-xl font-bold capitalize ${item.completed ? "line-through" : ""}`}>
                                            {item.name}
                                        </p>
                                        <div className="flex gap-2 items-center text-sm text-foreground/40 mt-1">
                                            <span className="font-semibold text-foreground/60">{item.amount}</span>
                                            <span>•</span>
                                            <span className="italic">From: {item.recipeTitle}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 text-foreground/20 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-card border border-dashed border-border rounded-[3rem]">
                        <div className="inline-flex items-center justify-center p-6 bg-foreground/5 rounded-full mb-6">
                            <Plus size={48} className="text-foreground/10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your basket is empty</h2>
                        <p className="text-foreground/50 mb-10 max-w-sm mx-auto text-lg hover:">
                            Visit any recipe and click the shopping cart icon next to an ingredient to add it here.
                        </p>
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg"
                        >
                            Find Recipes
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

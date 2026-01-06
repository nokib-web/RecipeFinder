'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, Filter, X, Loader2, ChevronDown, Refrigerator } from 'lucide-react';
import { cn } from '@/lib/utils';

const DIETS = ['vegetarian', 'vegan', 'gluten-free', 'ketogenic', 'paleo'];
const CUISINES = ['Italian', 'Mexican', 'Asian', 'American', 'Indian'];
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'];

export default function SearchFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [ingredients, setIngredients] = useState(searchParams.get('ingredients') || '');
    const [selectedDiet, setSelectedDiet] = useState(searchParams.get('diet') || '');
    const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || '');
    const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
    const [showFilters, setShowFilters] = useState(false);

    // Sync with URL when searchParams change (e.g. browser back button)
    useEffect(() => {
        setQuery(searchParams.get('query') || '');
        setIngredients(searchParams.get('ingredients') || '');
        setSelectedDiet(searchParams.get('diet') || '');
        setSelectedCuisine(searchParams.get('cuisine') || '');
        setSelectedType(searchParams.get('type') || '');
    }, [searchParams]);


    const updateFilters = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        // Always reset offset when filters change
        params.delete('offset');

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({ query });
    };

    const handleClear = () => {
        setQuery('');
        setIngredients('');
        setSelectedDiet('');
        setSelectedCuisine('');
        setSelectedType('');
        startTransition(() => {
            router.push(pathname);
        });
    };

    return (
        <div className="w-full space-y-4 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search recipes (e.g. Pasta, Chicken...)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    />
                    {isPending && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 className="animate-spin text-primary" size={20} />
                        </div>
                    )}
                </form>

                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all border shadow-sm",
                            showFilters
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border text-foreground/60 hover:bg-foreground/5"
                        )}
                    >
                        <Filter size={20} />
                        <span>Filters & Fridge</span>
                        <ChevronDown size={16} className={cn("transition-transform duration-300", showFilters && "rotate-180")} />
                    </button>

                    {(selectedDiet || selectedCuisine || selectedType || query || ingredients) && (
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-2 px-6 py-4 bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 text-foreground/60 border border-transparent hover:border-red-500/20 rounded-2xl font-bold transition-all shadow-sm"
                        >
                            <X size={20} />
                            <span className="hidden sm:inline">Clear</span>
                        </button>
                    )}
                </div>
            </div>


            {/* Expanded Filters */}
            <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden transition-all duration-500 ease-in-out bg-card border border-border rounded-[2.5rem] shadow-xl p-0 h-0 opacity-0",
                showFilters && "p-8 h-auto opacity-100 mt-4 border-primary/20"
            )}>
                <div className="lg:col-span-1">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4 px-2 flex items-center gap-2">
                        <Refrigerator size={16} className="text-primary" />
                        In your Fridge
                    </h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="e.g. eggs, tomato, cheese"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    updateFilters({ ingredients: e.currentTarget.value });
                                }
                            }}
                            className="w-full px-4 py-3 bg-foreground/5 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-card focus:border-primary/20 transition-all text-sm"
                        />
                        <p className="text-[10px] text-foreground/40 px-2 italic">Separate ingredients with commas.</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4 px-2">Dietary Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                        {DIETS.map((diet) => (
                            <button
                                key={diet}
                                onClick={() => {
                                    const next = selectedDiet === diet ? '' : diet;
                                    setSelectedDiet(next);
                                    updateFilters({ diet: next });
                                }}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                                    selectedDiet === diet
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-foreground/5 text-foreground/60 border-transparent hover:bg-foreground/10"
                                )}
                            >
                                {diet}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4 px-2">Cuisine Type</h3>
                    <div className="flex flex-wrap gap-2">
                        {CUISINES.map((cuisine) => (
                            <button
                                key={cuisine}
                                onClick={() => {
                                    const next = selectedCuisine === cuisine ? '' : cuisine;
                                    setSelectedCuisine(next);
                                    updateFilters({ cuisine: next });
                                }}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                                    selectedCuisine === cuisine
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-foreground/5 text-foreground/60 border-transparent hover:bg-foreground/10"
                                )}
                            >
                                {cuisine}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4 px-2">Meal Type</h3>
                    <div className="flex flex-wrap gap-2">
                        {MEAL_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    const next = selectedType === type ? '' : type;
                                    setSelectedType(next);
                                    updateFilters({ type: next });
                                }}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                                    selectedType === type
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-foreground/5 text-foreground/60 border-transparent hover:bg-foreground/10"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

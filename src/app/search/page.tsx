import { searchRecipes } from "@/lib/spoonacular";
import RecipeCard from "@/components/RecipeCard";
import SearchFilters from "@/components/SearchFilters";
import { SearchParams } from "@/types/recipe";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

interface PageProps {
    searchParams: Promise<SearchParams>;
}

export default async function SearchPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const query = params.query || "";
    const diet = params.diet || "";
    const cuisine = params.cuisine || "";
    const type = params.type || "";

    const results = await searchRecipes({
        query,
        diet,
        cuisine,
        type,
        number: 12,
    });

    return (
        <main className="min-h-screen py-12 px-4 md:px-8 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
                        {query ? (
                            <>Search results for <span className="text-primary">"{query}"</span></>
                        ) : (
                            "Explore Recipes"
                        )}
                    </h1>

                    <SearchFilters />

                    <div className="flex gap-3 flex-wrap">
                        {diet && (
                            <span className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-bold text-xs uppercase tracking-wider capitalize">
                                Diet: {diet}
                            </span>
                        )}
                        {cuisine && (
                            <span className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-bold text-xs uppercase tracking-wider capitalize">
                                Cuisine: {cuisine}
                            </span>
                        )}
                        {type && (
                            <span className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-bold text-xs uppercase tracking-wider capitalize">
                                Type: {type}
                            </span>
                        )}
                        {results.totalResults > 0 && (
                            <span className="px-5 py-2.5 bg-foreground/5 text-foreground/40 rounded-2xl font-bold text-xs uppercase tracking-wider">
                                {results.totalResults.toLocaleString()} recipes found
                            </span>
                        )}
                    </div>
                </header>


                {results.results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {results.results.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground/60">No recipes found matching your search.</h2>
                        <p>Try different keywords or filters.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

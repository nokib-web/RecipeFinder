import Image from "next/image";
import { getRecipeDetails } from "@/lib/spoonacular";
import { Clock, Users, ChevronLeft, CheckCircle2, Flame, Heart, Printer, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import RecipeActions from "@/components/RecipeActions";
import IngredientItem from "@/components/IngredientItem";
import StepTimerWrapper from "@/components/StepTimerWrapper";
import AddToPlanner from "@/components/AddToPlanner";
import InstructionStep from "@/components/InstructionStep";
import PairingSuggestions from "@/components/PairingSuggestions";




interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
    const { id } = await params;

    try {
        const recipe = await getRecipeDetails(id);

        return (
            <main className="min-h-screen bg-background">
                {/* Header/Back Button */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group back-to-search"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Search
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Section */}
                        <div className="relative aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute top-6 right-6 flex gap-3">
                                <FavoriteButton
                                    recipe={{
                                        id: recipe.id,
                                        title: recipe.title,
                                        image: recipe.image,
                                        imageType: recipe.imageType
                                    }}
                                />
                            </div>
                        </div>

                        {/* Basic Info Section */}
                        <div className="flex flex-col justify-center">
                            <div className="flex gap-2 mb-6 flex-wrap">
                                {recipe.diets?.map((diet) => (
                                    <span
                                        key={diet}
                                        className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold capitalize"
                                    >
                                        {diet}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight">
                                {recipe.title}
                            </h1>

                            <RecipeActions title={recipe.title} />

                            <div className="mb-10">
                                <AddToPlanner
                                    recipe={{
                                        id: recipe.id,
                                        title: recipe.title,
                                        image: recipe.image
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-10">
                                <div className="bg-card p-4 rounded-3xl border border-border flex flex-col items-center justify-center text-center">
                                    <Clock size={24} className="text-primary mb-2" />
                                    <span className="text-sm text-foreground/60">Time</span>
                                    <span className="font-bold">{recipe.readyInMinutes}m</span>
                                </div>
                                <div className="bg-card p-4 rounded-3xl border border-border flex flex-col items-center justify-center text-center">
                                    <Users size={24} className="text-primary mb-2" />
                                    <span className="text-sm text-foreground/60">Servings</span>
                                    <span className="font-bold">{recipe.servings}</span>
                                </div>
                                <div className="bg-card p-4 rounded-3xl border border-border flex flex-col items-center justify-center text-center">
                                    <Flame size={24} className="text-primary mb-2" />
                                    <span className="text-sm text-foreground/60">Health</span>
                                    <span className="font-bold">{recipe.healthScore}%</span>
                                </div>
                            </div>

                            <div
                                className="text-lg text-foreground/70 leading-relaxed mb-8 prose prose-slate dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: recipe.summary || '' }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
                        {/* Ingredients Column */}
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                Ingredients
                                <span className="text-sm font-normal text-foreground/40 bg-foreground/5 px-3 py-1 rounded-full">
                                    {recipe.extendedIngredients?.length || 0} items
                                </span>
                            </h2>
                            <ul className="space-y-4">
                                {recipe.extendedIngredients?.map((info) => (
                                    <IngredientItem
                                        key={`${info.id}-${info.original}`}
                                        name={info.name}
                                        amount={info.original}
                                        recipeTitle={recipe.title}
                                    />
                                ))}
                            </ul>

                            {/* Nutrition Section */}
                            {recipe.nutrition && (
                                <div className="mt-12">
                                    <h2 className="text-3xl font-bold mb-8">Nutrition Facts</h2>
                                    <div className="bg-card border border-border rounded-3xl p-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {recipe.nutrition.nutrients.filter(n =>
                                                ['Calories', 'Fat', 'Carbohydrates', 'Protein'].includes(n.name)
                                            ).map(nutrient => (
                                                <div key={nutrient.name} className="p-4 rounded-2xl bg-foreground/5 flex flex-col items-center justify-center text-center">
                                                    <span className="text-sm text-foreground/50 mb-1">{nutrient.name}</span>
                                                    <span className="font-bold text-lg">{Math.round(nutrient.amount)}{nutrient.unit}</span>
                                                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1">
                                                        {Math.round(nutrient.percentOfDailyNeeds)}% DV
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-border/50">
                                            <p className="text-sm text-foreground/40 text-center italic">
                                                * Percent Daily Values are based on a 2,000 calorie diet.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Instructions Column */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold mb-8">Instructions</h2>
                            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                                <div className="space-y-10">
                                    {recipe.analyzedInstructions[0].steps.map((step, index, array) => (
                                        <InstructionStep
                                            key={step.number}
                                            step={step}
                                            isLast={index === array.length - 1}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="prose prose-xl prose-slate dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: recipe.instructions || '' }}
                                />
                            )}
                        </div>
                    </div>

                    <PairingSuggestions recipeId={recipe.id} />
                </div>
            </main>

        );
    } catch (error) {
        console.error("Error loading recipe:", error);
        notFound();
    }
}

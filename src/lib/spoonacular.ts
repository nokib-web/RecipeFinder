import { SearchParams, SearchResults, Recipe, RecipeSummary } from "@/types/recipe";

const API_KEY = (process.env.SPOONACULAR_API_KEY || process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY)?.trim();
const BASE_URL = "https://api.spoonacular.com/recipes";

if (!API_KEY) {
    console.error("CRITICAL: Spoonacular API Key is missing! Check .env.local");
} else {
    console.log(`API Key loaded (Length: ${API_KEY.length}, Starts with: ${API_KEY.substring(0, 4)}...)`);
}

export async function searchRecipes(params: SearchParams): Promise<SearchResults> {
    const queryParams = new URLSearchParams({
        apiKey: API_KEY || "",
        addRecipeInformation: "true",
        ...Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
        ),
    });

    const response = await fetch(`${BASE_URL}/complexSearch?${queryParams.toString()}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Spoonacular API: Unauthorized. Please check if your API key is correctly set in .env.local and if it is valid.');
        }
        throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function getRecipeDetails(id: string | number): Promise<Recipe> {
    const response = await fetch(
        `${BASE_URL}/${id}/information?apiKey=${API_KEY}&includeNutrition=true`,
        {
            next: { revalidate: 3600 },
        }
    );


    if (!response.ok) {
        throw new Error(`Failed to fetch recipe details: ${response.statusText}`);
    }

    return response.json();
}

export async function getRandomRecipes(number: number = 10): Promise<{ recipes: Recipe[] }> {
    try {
        const response = await fetch(
            `${BASE_URL}/random?apiKey=${API_KEY}&number=${number}`,
            {
                next: { revalidate: 3600 }, // Increase cache for random to save quota
            }
        );

        if (!response.ok) {
            console.error(`Spoonacular Quota/Error (Random): ${response.status} ${response.statusText}`);
            return { recipes: [] };
        }

        return response.json();
    } catch (error) {
        console.error("getRandomRecipes failed:", error);
        return { recipes: [] };
    }
}

export async function getSimilarRecipes(id: string | number): Promise<RecipeSummary[]> {
    try {
        const response = await fetch(
            `${BASE_URL}/${id}/similar?apiKey=${API_KEY}&number=4`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            console.error(`Spoonacular Quota/Error (Similar): ${response.status} ${response.statusText}`);
            return [];
        }

        return response.json();
    } catch (error) {
        console.error("getSimilarRecipes failed:", error);
        return [];
    }
}

export async function getRecipesByIngredients(ingredients: string): Promise<RecipeSummary[]> {
    try {
        const response = await fetch(
            `${BASE_URL}/findByIngredients?apiKey=${API_KEY}&ingredients=${encodeURIComponent(ingredients)}&number=12`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            console.error(`Spoonacular Quota/Error (ByIngredients): ${response.status} ${response.statusText}`);
            return [];
        }

        return response.json();
    } catch (error) {
        console.error("getRecipesByIngredients failed:", error);
        return [];
    }
}



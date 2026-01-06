import { SearchParams, SearchResults, Recipe } from "@/types/recipe";

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
        `${BASE_URL}/${id}/information?apiKey=${API_KEY}`,
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
    const response = await fetch(
        `${BASE_URL}/random?apiKey=${API_KEY}&number=${number}`,
        {
            next: { revalidate: 0 }, // Random should probably not be cached or have short cache
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch random recipes: ${response.statusText}`);
    }

    return response.json();
}

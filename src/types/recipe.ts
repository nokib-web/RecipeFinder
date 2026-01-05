export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    readyInMinutes: number;
    servings: number;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    instructions: string;
    extendedIngredients: Ingredient[];
}

export interface Ingredient {
    id: number;
    aisle: string;
    image: string;
    name: string;
    amount: number;
    unit: string;
}

export interface SearchResults {
    results: Recipe[];
    offset: number;
    number: number;
    totalResults: number;
}

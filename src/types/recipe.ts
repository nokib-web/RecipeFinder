export interface Ingredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
        us: Measure;
        metric: Measure;
    };
}

export interface Measure {
    amount: number;
    unitShort: string;
    unitLong: string;
}

export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
    servings: number;
    readyInMinutes: number;
    license: string;
    sourceName: string;
    sourceUrl: string;
    spoonacularSourceUrl: string;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: string[];
    instructions: string;
    analyzedInstructions: AnalyzedInstruction[];
    extendedIngredients: Ingredient[];
    weightWatcherSmartPoints: number;
    gaps: string;
    lowFodmap: boolean;
    preparationMinutes: number;
    cookingMinutes: number;
    cheap: boolean;
    sustainable: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    whole30: boolean;
    vegan: boolean;
    vegetarian: boolean;
    dairyFree: boolean;
    glutenFree: boolean;
    nutrition?: Nutrition;
}

export interface Nutrition {
    nutrients: Nutrient[];
    properties: Property[];
    flavonoids: Property[];
    ingredients: IngredientNutrition[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: {
        amount: number;
        unit: string;
    };
}

export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

export interface Property {
    name: string;
    amount: number;
    unit: string;
}

export interface IngredientNutrition {
    id: number;
    name: string;
    amount: number;
    unit: string;
    nutrients: Nutrient[];
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
}


export interface AnalyzedInstruction {
    name: string;
    steps: Step[];
}

export interface Step {
    number: number;
    step: string;
    ingredients: Entiy[];
    equipment: Entiy[];
    length?: {
        number: number;
        unit: string;
    };
}

export interface Entiy {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

export interface SearchResults {
    results: RecipeSummary[];
    offset: number;
    number: number;
    totalResults: number;
}

export interface RecipeSummary {
    id: number;
    title: string;
    image: string;
    imageType: string;
}

export type SearchParams = {
    query?: string;
    cuisine?: string;
    diet?: string;
    intolerances?: string;
    type?: string;
    number?: number;
    offset?: number;
};

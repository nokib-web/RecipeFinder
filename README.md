# 🍳 RecipeFinder - Your Ultimate Culinary Assistant

**RecipeFinder** is a premium, feature-rich web application designed for home cooks, meal planners, and food enthusiasts. Powered by the **Spoonacular API**, it offers access to over 360,000+ recipes with advanced filtering, meal planning, and interactive cooking tools.

![RecipeFinder Hero Section](https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600)

## ✨ Features

### 🔍 Smart Exploration
*   **Complex Search**: Filter recipes by dietary restrictions (Vegan, Keto, etc.), Cuisines (Italian, Japanese, etc.), and Meal Types.
*   **"In your Fridge" Search**: Input ingredients you already have, and discover recipes you can make immediately.
*   **Visual Categories**: Quick-access cards for "Quick & Easy" (Under 30 mins) and "Healthy" meals.

### 🍱 Detailed Recipe Intelligence
*   **Rich Analytics**: View full nutrition facts (Calories, Protein, Carbs, Fat) with % Daily Values.
*   **Interactive Instructions**: Check off steps as you go with a final "Completion Celebration."
*   **Smart Timers**: Built-in kitchen timers for steps requiring specific durations.
*   **Similar Recipes**: Intelligent suggestions to help you build the perfect menu.

### 📅 Organizational Tools
*   **Weekly Meal Planner**: Drag-and-drop style planner for Breakfast, Lunch, and Dinner.
*   **Smart Shopping List Pro**: Add recipe ingredients directly to your list, check them off, and clear them in bulk.
*   **Favorites System**: Save your most-loved recipes to your personal collection with local persistence.

### 🏆 Gamified Experience
*   **Achievement System**: Track your progress and unlock trophies for cooking recipes, saving favorites, and planning meals.
*   **Cooking Mode**: A high-contrast "Deep Black & Gold" theme designed for low-light kitchen environments.

### 📤 Utility & Sharing
*   **Print Pro**: Optimized print-friendly CSS for clean, single-page recipe printouts.
*   **Native Sharing**: Share your discoveries via URL or social media directly from the app.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Data Source**: [Spoonacular API](https://spoonacular.com/food-api)
*   **Persistence**: Browser Local Storage

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js 18.x or later installed.
*   A free API Key from [Spoonacular](https://spoonacular.com/food-api/console).

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/nokib-web/RecipeFinder.git

# Navigate to the project
cd recipefinder

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your API key:
```env
SPOONACULAR_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_SPOONACULAR_API_KEY=your_actual_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## 📖 How to Use

1.  **Search**: Use the Hero search bar or the "Explore" page to find recipes.
2.  **Filter**: Toggle the "Filters & Fridge" menu to refine your results or search by available ingredients.
3.  **Plan**: Click any recipe and use the "Add to Planner" button to schedule it.
4.  **Cook**: Use the checkable instructions and timers on the recipe detail page. Hit the **Chef Hat icon** in the navbar to enable **Cooking Mode**.
5.  **Shop**: Visit your "Shopping List" to see all ingredients added from various recipes.

---

## 🌍 Deployment

This app is optimized for deployment on **Vercel**. See the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for detailed instructions on production setup and environment variable configuration.

---

## 📄 License
This project is open-source and available under the MIT License.

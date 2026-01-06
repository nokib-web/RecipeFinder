import Hero from "@/components/Hero";
import Link from "next/link";
import { getRandomRecipes } from "@/lib/spoonacular";
import RecipeCard from "@/components/RecipeCard";
import { Calendar, ShoppingBag, Heart, Salad, Pizza, Coffee, Cookie, Leaf, Wheat, UtensilsCrossed, ChefHat, Zap, HeartPulse } from "lucide-react";

export default async function Home() {
  let recipes: any[] = [];
  try {
    const data = await getRandomRecipes(4);
    recipes = data.recipes;
  } catch (error) {
    console.error("Failed to fetch random recipes:", error);
  }

  const categories = [
    { name: 'Quick & Easy', query: 'maxReadyTime=30', icon: Zap, color: 'bg-yellow-500/10 text-yellow-600' },
    { name: 'Healthy', query: 'minHealthScore=70', icon: HeartPulse, color: 'bg-emerald-500/10 text-emerald-600' },
    { name: 'Vegetarian', query: 'diet=vegetarian', icon: Salad, color: 'bg-green-500/10 text-green-600' },
    { name: 'Italian', query: 'cuisine=italian', icon: Pizza, color: 'bg-red-500/10 text-red-600' },
    { name: 'Japanese', query: 'cuisine=japanese', icon: UtensilsCrossed, color: 'bg-blue-500/10 text-blue-600' },
    { name: 'Mexican', query: 'cuisine=mexican', icon: ChefHat, color: 'bg-orange-500/10 text-orange-600' },
    { name: 'Breakfast', query: 'type=breakfast', icon: Coffee, color: 'bg-yellow-500/10 text-yellow-600' },
    { name: 'Desserts', query: 'type=dessert', icon: Cookie, color: 'bg-pink-500/10 text-pink-600' },
  ];




  const features = [
    {
      title: 'Plan Your Week',
      description: 'Organize your meals with our interactive planner.',
      icon: Calendar,
      link: '/planner',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      title: 'Smart Shopping',
      description: 'Add ingredients directly to your checklist.',
      icon: ShoppingBag,
      link: '/shopping-list',
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      title: 'Save Favorites',
      description: 'Keep your most-loved recipes just a click away.',
      icon: Heart,
      link: '/favorites',
      color: 'bg-rose-500/10 text-rose-600'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4 md:px-8 lg:px-24 bg-background overflow-hidden relative">
      <Hero />

      {/* Features Grid */}
      <div className="w-full max-w-7xl mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/20 hover:shadow-2xl transition-all group"
            >
              <div className={`p-4 rounded-2xl ${feature.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/50 leading-relaxed font-medium">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Random Inspiration */}
      <div className="w-full max-w-7xl mt-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Random <span className="text-primary">Inspiration</span></h2>
            <p className="text-foreground/50 text-lg font-medium">Don't know what to cook? Try these.</p>
          </div>
          <Link href="/search" className="hidden sm:inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all">
            See All Recipes →
          </Link>
        </div>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-card border border-dashed border-border rounded-[3rem]">
            <p className="text-foreground/50 text-lg font-medium mb-6">
              Our random generator is taking a break. <br />
              Browse by category or search to find your next meal!
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg"
            >
              Go to Search
            </Link>
          </div>
        )}
      </div>


      {/* Categories Section */}
      <div className="w-full max-w-7xl mt-32 mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 text-center md:text-left">Visual <span className="text-primary">Browser</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/search?${category.query}`}
              className="group relative h-48 rounded-[2.5rem] overflow-hidden cursor-pointer bg-card border border-border transition-all hover:shadow-2xl hover:-translate-y-2 p-8 flex flex-col items-center justify-center text-center gap-4"
            >
              <div className={`p-6 rounded-[2rem] ${category.color} z-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                <category.icon size={48} />
              </div>
              <div className="z-20">
                <p className="font-bold text-xl mb-1">{category.name}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>


      {/* CTA Section */}
      <div className="w-full max-w-7xl mb-12">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter">Ready to become a <br className="hidden md:block" /> <span className="text-primary italic">Kitchen Master?</span></h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/search"
                className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-extrabold text-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl text-center"
              >
                Start Exploring
              </Link>
              <button className="px-10 py-5 bg-background/10 hover:bg-background/20 text-background rounded-2xl font-extrabold text-xl border border-background/20 transition-all text-center">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

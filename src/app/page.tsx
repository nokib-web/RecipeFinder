import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 px-4 md:px-24">
      <Hero />

      {/* Featured Section Placeholder */}
      <div className="w-full max-w-7xl mt-24">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Breakfast', 'Lunch', 'Dinner', 'Dessert'].map((category) => (
            <div
              key={category}
              className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer bg-card border border-border transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-4 left-6 z-20">
                <p className="text-white font-semibold text-xl">{category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

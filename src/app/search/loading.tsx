import { RecipeSkeleton } from "@/components/Skeleton";

export default function SearchLoading() {
    return (
        <main className="min-h-screen py-12 px-4 md:px-8 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <div className="h-12 w-96 bg-foreground/10 animate-pulse rounded-2xl mb-8" />

                    {/* Dummy Filters */}
                    <div className="h-16 w-full bg-foreground/10 animate-pulse rounded-[2.5rem] mb-6" />

                    <div className="flex gap-2">
                        <div className="h-8 w-24 bg-foreground/10 animate-pulse rounded-full" />
                        <div className="h-8 w-24 bg-foreground/10 animate-pulse rounded-full" />
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <RecipeSkeleton key={i} />
                    ))}
                </div>
            </div>
        </main>
    );
}

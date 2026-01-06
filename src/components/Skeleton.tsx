import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-foreground/10", className)}
            {...props}
        />
    );
}

export function RecipeSkeleton() {
    return (
        <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm h-full flex flex-col">
            <Skeleton className="aspect-video" />
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <Skeleton className="h-10 w-12 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

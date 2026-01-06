import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-xl font-medium text-foreground/60">Simmering your recipes...</p>
        </div>
    );
}

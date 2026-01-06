'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-red-500/10 p-6 rounded-3xl mb-8">
                <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-foreground/60 max-w-md mb-10 text-lg">
                {error.message || "We encountered an error while fetching your recipes. Please check your API key and try again."}
            </p>
            <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
            >
                <RefreshCw size={20} />
                Try Again
            </button>
        </div>
    );
}

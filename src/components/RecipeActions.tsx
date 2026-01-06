'use client';

import { Printer, Share2 } from "lucide-react";

export default function RecipeActions({ title }: { title: string }) {
    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Recipe: ${title}`,
                    text: `Check out this delicious recipe for ${title}!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="flex gap-4 mb-8 action-buttons">
            <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl font-semibold hover:bg-foreground/5 transition-all"
            >
                <Printer size={20} className="text-primary" />
                Print Recipe
            </button>
            <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl font-semibold hover:bg-foreground/5 transition-all"
            >
                <Share2 size={20} className="text-primary" />
                Share
            </button>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { Search, UtensilsCrossed } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative min-height-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10 max-w-3xl"
            >
                <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-primary/10 text-primary">
                    <UtensilsCrossed size={32} />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Discover Your Next <br />
                    <span className="text-primary">Culinary Masterpiece</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed">
                    Search over 360,000+ recipes, customize by diet, and find the perfect meal
                    for any occasion. Your personal kitchen assistant.
                </p>

                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-foreground/40" size={20} />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-5 bg-card/50 backdrop-blur-xl border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg shadow-2xl"
                        placeholder="Search recipes, ingredients, or cuisines..."
                    />
                    <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                        Search
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

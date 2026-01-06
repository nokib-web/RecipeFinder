import Link from 'next/link';
import { UtensilsCrossed, Github, Twitter, Instagram, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="bg-primary p-2 rounded-xl text-primary-foreground group-hover:rotate-12 transition-transform">
                                <UtensilsCrossed size={24} />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Recipe<span className="text-primary">Finder</span></span>
                        </Link>
                        <p className="text-foreground/60 text-sm leading-relaxed">
                            Discover over 360,000+ recipes, plan your meals, and shop smarter. Your ultimate kitchen companion.
                        </p>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h3 className="font-bold mb-6 text-foreground/80">Discover</h3>
                        <ul className="space-y-4 text-sm text-foreground/60">
                            <li><Link href="/search" className="hover:text-primary transition-colors">Explore Recipes</Link></li>
                            <li><Link href="/search?diet=vegetarian" className="hover:text-primary transition-colors">Vegetarian</Link></li>
                            <li><Link href="/search?type=breakfast" className="hover:text-primary transition-colors">Breakfast Ideas</Link></li>
                            <li><Link href="/search?query=healthy" className="hover:text-primary transition-colors">Healthy Options</Link></li>
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="font-bold mb-6 text-foreground/80">Tools</h3>
                        <ul className="space-y-4 text-sm text-foreground/60">
                            <li><Link href="/planner" className="hover:text-primary transition-colors">Meal Planner</Link></li>
                            <li><Link href="/shopping-list" className="hover:text-primary transition-colors">Shopping List</Link></li>
                            <li><Link href="/favorites" className="hover:text-primary transition-colors">My Favorites</Link></li>
                            <li><Link href="/achievements" className="hover:text-primary transition-colors">Achievements</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div>
                        <h3 className="font-bold mb-6 text-foreground/80">Connect</h3>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                        <p className="text-xs text-foreground/40">
                            Made by <a href="https://nokib.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">nokib.dev</a>
                        </p>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/40">
                    <p>© {new Date().getFullYear()} RecipeFinder. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import { useAchievements, Achievement } from '@/lib/useAchievements';
import { Trophy, CheckCircle2, Lock, Flame, Heart, Calendar, ChefHat, Medal, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
    '🍳': ChefHat,
    '🏠': Medal,
    '🎨': Star,
    '👨‍🍳': Trophy,
    '🦋': Heart,
    '📅': Calendar,
};

export default function AchievementsPage() {
    const { stats, unlockedIds, achievements } = useAchievements();

    const progress = (achievements.filter(a => unlockedIds.includes(a.id)).length / achievements.length) * 100;

    return (
        <main className="min-h-screen py-12 px-4 md:px-8 lg:px-24 bg-background">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg animate-bounce">
                            <Trophy size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Your <span className="text-primary">Achievements</span></h1>
                    </div>
                    <p className="text-foreground/50 text-xl font-medium">Track your culinary journey and unlock legendary titles.</p>
                </header>

                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    <div className="md:col-span-1 p-8 rounded-[2.5rem] bg-card border border-border flex flex-col items-center justify-center text-center shadow-xl">
                        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="64" cy="64" r="58"
                                    className="stroke-foreground/5 fill-none stroke-[8]"
                                />
                                <circle
                                    cx="64" cy="64" r="58"
                                    className="stroke-primary fill-none stroke-[8] transition-all duration-1000"
                                    strokeDasharray={364}
                                    strokeDashoffset={364 - (364 * progress) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute text-3xl font-black">{Math.round(progress)}%</span>
                        </div>
                        <p className="font-bold text-foreground/40 uppercase tracking-widest text-xs">Overall Progress</p>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-8 rounded-[2.5rem] bg-card border border-border">
                            <ChefHat className="text-primary mb-4" size={32} />
                            <h3 className="text-4xl font-black mb-1">{stats.cooked_count}</h3>
                            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Meals Cooked</p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-card border border-border">
                            <Heart className="text-rose-500 mb-4" size={32} />
                            <h3 className="text-4xl font-black mb-1">{stats.favorite_count}</h3>
                            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Savorited</p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-card border border-border">
                            <Calendar className="text-blue-500 mb-4" size={32} />
                            <h3 className="text-4xl font-black mb-1">{stats.planner_count}</h3>
                            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Planned Ahead</p>
                        </div>
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => {
                        const isUnlocked = unlockedIds.includes(achievement.id);
                        const Icon = ICON_MAP[achievement.icon] || Star;
                        const currentProgress = Math.min((stats[achievement.type] / achievement.requirement) * 100, 100);

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={achievement.id}
                                className={cn(
                                    "relative p-8 rounded-[2.5rem] border transition-all duration-500 group overflow-hidden shadow-sm",
                                    isUnlocked
                                        ? "bg-card border-primary/20 shadow-primary/5"
                                        : "bg-card/50 border-border grayscale opacity-60"
                                )}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={cn(
                                        "p-4 rounded-2xl transition-all duration-500",
                                        isUnlocked ? "bg-primary text-primary-foreground scale-110 rotate-3" : "bg-foreground/10 text-foreground/40"
                                    )}>
                                        <Icon size={32} />
                                    </div>
                                    {isUnlocked ? (
                                        <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    ) : (
                                        <div className="bg-foreground/10 text-foreground/40 p-2 rounded-full">
                                            <Lock size={16} />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl font-extrabold mb-2">{achievement.title}</h3>
                                <p className="text-foreground/50 font-medium mb-6 leading-relaxed">{achievement.description}</p>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1">
                                        <span>Progress</span>
                                        <span>{stats[achievement.type]} / {achievement.requirement}</span>
                                    </div>
                                    <div className="h-3 bg-foreground/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${currentProgress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                isUnlocked ? "bg-primary" : "bg-foreground/20"
                                            )}
                                        />
                                    </div>
                                </div>

                                {isUnlocked && (
                                    <div className="absolute -bottom-4 -right-4 text-primary/5 -rotate-12 transition-transform group-hover:scale-125 group-hover:-rotate-45">
                                        <Icon size={120} />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

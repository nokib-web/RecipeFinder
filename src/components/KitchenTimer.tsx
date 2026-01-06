'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
    minutes: number;
    label?: string;
    onClose?: () => void;
}

export default function KitchenTimer({ minutes, label, onClose }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            // Play a sound or notification here if desired
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const toggle = () => setIsActive(!isActive);

    const reset = () => {
        setIsActive(false);
        setTimeLeft(minutes * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((minutes * 60 - timeLeft) / (minutes * 60)) * 100;

    return (
        <div className="bg-card border border-primary/20 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <TimerIcon size={18} />
                    <span className="text-sm uppercase tracking-wider">{label || 'Kitchen Timer'}</span>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-foreground/20 hover:text-foreground/60 p-1">
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-6">
                <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-foreground/5"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray={226}
                            strokeDashoffset={226 - (226 * progress) / 100}
                            strokeLinecap="round"
                            className="text-primary transition-all duration-1000"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <button
                            onClick={toggle}
                            className={cn(
                                "p-3 rounded-xl transition-all",
                                isActive ? "bg-orange-500 text-white" : "bg-primary text-primary-foreground"
                            )}
                        >
                            {isActive ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                        </button>
                        <button
                            onClick={reset}
                            className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-all"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                    <span className="text-[10px] text-foreground/40 font-medium">
                        {isActive ? "Timer Running..." : timeLeft === 0 ? "Done!" : "Ready to Start"}
                    </span>
                </div>
            </div>
        </div>
    );
}

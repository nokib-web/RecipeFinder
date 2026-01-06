'use client';

import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import StepTimerWrapper from './StepTimerWrapper';
import { useAchievements } from '@/lib/useAchievements';


interface Step {
    number: number;
    step: string;
    length?: {
        number: number;
        unit: string;
    };
}

interface InstructionStepProps {
    step: Step;
    isLast: boolean;
    onComplete?: () => void;
}

export default function InstructionStep({ step, isLast, onComplete }: InstructionStepProps) {
    const [isCompleted, setIsCompleted] = useState(false);
    const { incrementCooked } = useAchievements();

    const handleToggle = () => {
        const nextState = !isCompleted;
        setIsCompleted(nextState);

        if (nextState) {
            if (isLast) {
                incrementCooked();
                // Epic confetti explosion for completing the meal!

                const duration = 5 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);

                onComplete?.();
            } else {
                // Subtle confetti for individual steps
                confetti({
                    particleCount: 40,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#f97316', '#fb923c', '#ffffff']
                });
            }
        }
    };

    return (
        <div
            onClick={handleToggle}
            className={cn(
                "flex gap-6 group cursor-pointer p-4 rounded-3xl transition-all border border-transparent",
                isCompleted ? "bg-green-500/5 border-green-500/10 opacity-70" : "hover:bg-foreground/5 hover:border-border"
            )}
        >
            <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-300",
                isCompleted
                    ? "bg-green-500 text-white rotate-[360deg]"
                    : "bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            )}>
                {isCompleted ? <CheckCircle2 size={24} /> : step.number}
            </div>

            <div className="pt-2 flex-grow">
                <p className={cn(
                    "text-xl leading-relaxed transition-all",
                    isCompleted ? "text-foreground/40 line-through" : "text-foreground/80"
                )}>
                    {step.step}
                </p>

                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                    {step.length && (
                        <StepTimerWrapper
                            minutes={step.length.number}
                            stepNumber={step.number}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import KitchenTimer from './KitchenTimer';

interface StepTimerWrapperProps {
    minutes: number;
    stepNumber: number;
}

export default function StepTimerWrapper({ minutes, stepNumber }: StepTimerWrapperProps) {
    const [showTimer, setShowTimer] = useState(false);

    return (
        <div className="mt-4">
            {!showTimer ? (
                <button
                    onClick={() => setShowTimer(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-bold hover:bg-primary/20 transition-all group"
                >
                    <TimerIcon size={16} className="group-hover:rotate-12 transition-transform" />
                    Set Timer for {minutes}m
                </button>
            ) : (
                <div className="max-w-xs">
                    <KitchenTimer
                        minutes={minutes}
                        label={`Step ${stepNumber} Timer`}
                        onClose={() => setShowTimer(false)}
                    />
                </div>
            )}
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineStatus() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        setIsOffline(!window.navigator.onLine);

        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white p-2 flex items-center justify-center gap-2 font-bold shadow-lg"
                >
                    <WifiOff size={20} />
                    <span>You are currently offline. Some features may be unavailable.</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

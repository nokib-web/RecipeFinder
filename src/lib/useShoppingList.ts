'use client';

import { useState, useEffect } from 'react';

export interface ShoppingItem {
    id: string;
    name: string;
    amount: string;
    recipeTitle: string;
    completed: boolean;
}

export function useShoppingList() {
    const [items, setItems] = useState<ShoppingItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('recipe-shopping-list');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse shopping list", e);
            }
        }
    }, []);

    const save = (newItems: ShoppingItem[]) => {
        setItems(newItems);
        localStorage.setItem('recipe-shopping-list', JSON.stringify(newItems));
    };

    const addItem = (item: Omit<ShoppingItem, 'completed'>) => {
        const newItem = { ...item, completed: false };
        save([...items, newItem]);
    };

    const addMultiple = (newItems: Omit<ShoppingItem, 'completed'>[]) => {
        const formatted = newItems.map(item => ({ ...item, completed: false }));
        save([...items, ...formatted]);
    };

    const removeItem = (id: string) => {
        save(items.filter(i => i.id !== id));
    };

    const toggleItem = (id: string) => {
        save(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
    };

    const clearCompleted = () => {
        save(items.filter(i => !i.completed));
    };

    const checkAll = () => {
        save(items.map(i => ({ ...i, completed: true })));
    };

    const clearAll = () => {
        save([]);
    };

    return { items, addItem, addMultiple, removeItem, toggleItem, clearCompleted, checkAll, clearAll };
}


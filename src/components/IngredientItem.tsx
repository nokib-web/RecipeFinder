'use client';

import { Plus, Check, ShoppingCart } from "lucide-react";
import { useShoppingList } from "@/lib/useShoppingList";
import { useState } from "react";

interface IngredientItemProps {
    name: string;
    amount: string;
    recipeTitle: string;
}

export default function IngredientItem({ name, amount, recipeTitle }: IngredientItemProps) {
    const { addItem } = useShoppingList();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            id: `${Date.now()}-${name}`,
            name,
            amount,
            recipeTitle
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <li className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
            <div className="flex-grow">
                <p className="font-medium text-lg capitalize">{name}</p>
                <p className="text-foreground/50">{amount}</p>
            </div>
            <button
                onClick={handleAdd}
                disabled={added}
                className={`p-2 rounded-xl transition-all ${added
                        ? "bg-green-500 text-white"
                        : "bg-foreground/5 text-foreground/40 hover:text-primary hover:bg-primary/10"
                    }`}
            >
                {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
        </li>
    );
}

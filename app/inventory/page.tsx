'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ShoppingBag, Calendar, AlertTriangle,
    ChevronRight, Thermometer, Droplets, Search, Plus
} from 'lucide-react';
import { FoodItem } from '@/app/lib/data';

export default function InventoryPage() {
    const [items, setItems] = useState<FoodItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/inventory');
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getRiskColor = (risk: number) => {
        if (risk > 80) return 'text-red-600 bg-red-50';
        if (risk > 40) return 'text-amber-600 bg-amber-50';
        return 'text-emerald-600 bg-emerald-50';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Inventory Status</h1>
                    <p className="text-slate-500">Track freshness and spoilage risk for individual items.</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                    <Plus size={20} />
                    Register Item
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl"></div>)
                ) : (
                    items.map((item) => (
                        <Link
                            key={item.id}
                            href={`/inventory/${item.id}`}
                            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-5 hover:border-emerald-200 transition-all group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                    <ShoppingBag size={28} />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getRiskColor(item.spoilageRisk)}`}>
                                    {item.spoilageRisk}% Spoilage Risk
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                                <p className="text-slate-500 text-sm font-medium">{item.category}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar size={10} /> Added Date
                                    </p>
                                    <p className="text-sm font-bold text-slate-700">{new Date(item.addedDate).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar size={10} /> Expiry Est.
                                    </p>
                                    <p className="text-sm font-bold text-slate-700">{new Date(item.expiryDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Thermometer size={14} />
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <Droplets size={14} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 font-bold text-emerald-600 text-sm">
                                    View Analysis
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

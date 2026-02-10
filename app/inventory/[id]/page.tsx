'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
    ArrowLeft, ShoppingBag, Thermometer, Droplets,
    Wind, Calendar, AlertTriangle, CheckCircle2,
    BarChart3, Info, Share2, Printer
} from 'lucide-react';
import { FoodItem, SensorData, mockFoodItems, mockSensors } from '@/app/lib/data';

export default function ItemDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [item, setItem] = useState<FoodItem | null>(null);
    const [storage, setStorage] = useState<SensorData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating API fetch
        const foundItem = mockFoodItems.find(i => i.id === id);
        if (foundItem) {
            setItem(foundItem);
            const foundStorage = mockSensors.find(s => s.id === foundItem.currentStorageId);
            if (foundStorage) setStorage(foundStorage);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading status...</div>;
    if (!item) return <div className="p-20 text-center">Item not found.</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-10">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Inventory
            </button>

            <div className="flex flex-col md:flex-row gap-10">
                {/* Left Column - Main Info */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                                    {item.category}
                                </span>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${item.status === 'Fresh' ? 'bg-emerald-500 text-white' :
                                        item.status === 'At Risk' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">{item.name}</h1>
                            <p className="text-slate-500 font-medium">Tracking ID: ALMA-{item.id.toUpperCase()}</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50"><Share2 size={20} /></button>
                            <button className="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50"><Printer size={20} /></button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BarChart3 size={20} className="text-emerald-500" />
                            Dynamic Freshness Analysis
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Spoilage Risk</p>
                                <p className="text-3xl font-black text-slate-900">{item.spoilageRisk}%</p>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${item.spoilageRisk > 80 ? 'bg-red-500' :
                                            item.spoilageRisk > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`}
                                    style={{ width: `${item.spoilageRisk}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-slate-500 italic">
                                {item.spoilageRisk > 80 ? "Critical: Quality degradation detected. Ethylene levels peaking." :
                                    item.spoilageRisk > 40 ? "Warning: Slightly elevated storage temperature. Plan for immediate use." :
                                        "System stable: Current storage conditions are optimal for this commodity."}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-2">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Thermometer size={18} />
                                <span className="font-bold text-sm uppercase">Ideal Temperature</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{item.conditions.idealTemp[0]}°C - {item.conditions.idealTemp[1]}°C</p>
                        </div>
                        <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 space-y-2">
                            <div className="flex items-center gap-2 text-emerald-600">
                                <Droplets size={18} />
                                <span className="font-bold text-sm uppercase">Ideal Humidity</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{item.conditions.idealHumidity[0]}% - {item.conditions.idealHumidity[1]}%</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Storage Details */}
                <div className="w-full md:w-80 space-y-6">
                    <div className="bg-slate-900 text-white p-8 rounded-[38px] space-y-6 shadow-2xl shadow-slate-300">
                        <h3 className="font-bold text-lg">Current Storage</h3>

                        {storage ? (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{storage.type}</p>
                                    <p className="text-xl font-bold">{storage.name}</p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-800">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 text-sm">Temperature</span>
                                        <span className="font-bold">{storage.temperature}°C</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 text-sm">Humidity</span>
                                        <span className="font-bold">{storage.humidity}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 text-sm">Gas Level</span>
                                        <span className={`font-bold ${storage.gasLevel === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>
                                            {storage.gasLevel}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <p className="text-xs font-medium">Sensor Node Active</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-400">Loading storage info...</p>
                        )}
                    </div>

                    <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 flex gap-4">
                        <div className="mt-1 text-amber-600"><Info size={24} /></div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Logistics Note</h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                Estimated 36 hours remaining at current storage temperature before risk level reaches 80%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Calendar, ArrowUpRight, ArrowDownRight, Shield } from 'lucide-react';
import Toast, { ToastType } from '@/app/components/Toast';

const analyticsData = [
    { name: 'Mon', spoilage: 400, prevented: 240, vocLevel: 12 },
    { name: 'Tue', spoilage: 300, prevented: 139, vocLevel: 15 },
    { name: 'Wed', spoilage: 200, prevented: 380, vocLevel: 18 },
    { name: 'Thu', spoilage: 278, prevented: 390, vocLevel: 22 },
    { name: 'Fri', spoilage: 189, prevented: 480, vocLevel: 14 },
    { name: 'Sat', spoilage: 239, prevented: 380, vocLevel: 10 },
    { name: 'Sun', spoilage: 349, prevented: 430, vocLevel: 8 },
];

const pieData = [
    { name: 'Optimal Freshness', value: 65, color: '#15803d' },
    { name: 'Early Decay (VOC Stage)', value: 20, color: '#f59e0b' },
    { name: 'Spoilage Imminent', value: 10, color: '#ef4444' },
    { name: 'Critical Loss', value: 5, color: '#7f1d1d' },
];

export default function AnalyticsPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [dateRange, setDateRange] = useState('Real-time (Live)');

    const handleDateRange = () => {
        const newRange = dateRange === 'Real-time (Live)' ? 'History (30 Days)' : 'Real-time (Live)';
        setDateRange(newRange);
        setToast({ message: `Switching to ${newRange} mode`, type: 'info' });
    };

    const handleExport = () => {
        setToast({ message: "Generating molecular analysis report...", type: 'info' });
        setTimeout(() => {
            setToast({ message: "Comprehensive Report Exported (PDF)", type: 'success' });
        }, 1500);
    }

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight">Molecular Intelligence</h2>
                    <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-[10px]">Real-time Freshness Monitoring & Prediction</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleDateRange}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border-2 border-[var(--border)] text-[var(--muted-foreground)] rounded-2xl text-[12px] font-black uppercase tracking-wider hover:border-green-500 transition-all active:scale-95"
                    >
                        <Calendar size={16} />
                        {dateRange}
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0a4a34] text-white rounded-2xl text-[12px] font-black uppercase tracking-wider hover:bg-[#0c5a3e] transition-all shadow-lg shadow-green-900/10 active:scale-95"
                    >
                        <Download size={16} />
                        Export Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Spoilage Prevented (KG)", value: "4,821", change: "+14%", icon: ArrowUpRight, color: "text-green-600" },
                    { label: "Storage Life Ext. (Avg)", value: "3.2 Days", change: "+0.8", icon: ArrowUpRight, color: "text-blue-600" },
                    { label: "Current VOC Level", value: "18 ppm", change: "Safe", icon: Shield, color: "text-slate-600" },
                    { label: "Critical Alerts", value: "2", change: "-50%", icon: ArrowDownRight, color: "text-red-600" }
                ].map((stat, i) => (
                    <div key={i} className="bg-[var(--card)] p-6 rounded-[32px] border-2 border-[var(--border)] shadow-sm hover:shadow-xl transition-all group">
                        <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest mb-3">{stat.label}</p>
                        <h3 className="text-3xl font-black text-[var(--foreground)] mb-2 tracking-tighter">{stat.value}</h3>
                        <div className={`flex items-center gap-1 text-[11px] font-black uppercase ${stat.color}`}>
                            <span>{stat.change}</span>
                            <span className="text-[var(--muted-foreground)] opacity-50 font-bold ml-1">Today</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[var(--card)] p-10 rounded-[40px] border-2 border-[var(--border)] shadow-sm">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-tight">Molecular Freshness Index</h3>
                            <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Real-time VOC concentration vs Baseline</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#15803d]"></div>
                                <span className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">Predicted Freshness</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
                                <span className="text-[10px] font-black uppercase text-[var(--muted-foreground)]">Decay Markers</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorSpoilage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#15803d" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVOC" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--muted-foreground)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--muted-foreground)' }} />
                                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="var(--border)" />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                        fontWeight: '900',
                                        backgroundColor: 'var(--card)',
                                        color: 'var(--foreground)'
                                    }}
                                />
                                <Area type="monotone" dataKey="prevented" stroke="#15803d" strokeWidth={4} fillOpacity={1} fill="url(#colorSpoilage)" />
                                <Area type="monotone" dataKey="vocLevel" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorVOC)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[var(--card)] p-10 rounded-[40px] border-2 border-[var(--border)] shadow-sm">
                    <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-tight mb-2">Inventory Health</h3>
                    <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest mb-10">Current stock condition status</p>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        fontSize: '10px',
                                        fontWeight: '900',
                                        backgroundColor: 'var(--card)',
                                        color: 'var(--foreground)'
                                    }}
                                />
                                <Legend
                                    iconType="circle"
                                    layout="vertical"
                                    verticalAlign="bottom"
                                    align="center"
                                    wrapperStyle={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import {
    Bell, AlertTriangle, AlertCircle, Info,
    Trash2, CheckCircle, Clock, MapPin
} from 'lucide-react';
import { Alert } from '@/app/lib/data';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();
                setAlerts(data);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSeverityStyles = (severity: string) => {
        switch (severity) {
            case 'Critical': return 'border-red-500 bg-red-50 text-red-700';
            case 'Warning': return 'border-amber-500 bg-amber-50 text-amber-700';
            default: return 'border-blue-500 bg-blue-50 text-blue-700';
        }
    };

    const getIcon = (severity: string) => {
        switch (severity) {
            case 'Critical': return <AlertCircle size={24} />;
            case 'Warning': return <AlertTriangle size={24} />;
            default: return <Info size={24} />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8">
            <header className="flex justify-between items-end border-b border-slate-100 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Incident Center</h1>
                    <p className="text-slate-500">View and manage system notifications and spoilage alerts.</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600">
                    <Trash2 size={16} />
                    Clear All
                </button>
            </header>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-slate-50 animate-pulse rounded-3xl"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div key={alert.id} className={`p-6 bg-white rounded-3xl border-l-[6px] shadow-sm transform transition hover:scale-[1.01] ${getSeverityStyles(alert.severity)}`}>
                            <div className="flex gap-4">
                                <div className="shrink-0 mt-1">
                                    {getIcon(alert.severity)}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{alert.type} Alert</h3>
                                            <div className="flex items-center gap-4 mt-1 text-slate-500 text-sm font-medium">
                                                <span className="flex items-center gap-1"><MapPin size={14} /> {alert.storageName}</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> 12 mins ago</span>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${alert.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {alert.severity}
                                        </span>
                                    </div>

                                    <p className="text-slate-700 leading-relaxed font-medium">
                                        {alert.message} {alert.foodName && <span>Affected item: <strong className="text-slate-900">{alert.foodName}</strong></span>}
                                    </p>

                                    <div className="flex gap-3 pt-2">
                                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                                            Take Action
                                        </button>
                                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                                            Mark Resolved
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {alerts.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">All Clear!</h3>
                            <p className="text-slate-500">No active incidents detected in your system.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Bell, Filter } from 'lucide-react';
import { Alert } from '@/app/lib/data';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
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
        fetchAlerts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#4a7c59] rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 font-medium">Loading Alerts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">System Alerts</h2>
                    <p className="text-gray-500 text-sm">Monitor and manage critical system notifications</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Filter size={16} />
                        Filter Severity
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <CheckCircle2 size={16} />
                        Mark All Read
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl border ${alert.severity === 'Critical'
                                ? 'bg-red-50 border-red-100'
                                : alert.severity === 'Warning'
                                    ? 'bg-orange-50 border-orange-100'
                                    : 'bg-blue-50 border-blue-100'
                            }`}>
                            <div className={`p-2 rounded-full shrink-0 ${alert.severity === 'Critical'
                                    ? 'bg-red-100 text-red-600'
                                    : alert.severity === 'Warning'
                                        ? 'bg-orange-100 text-orange-600'
                                        : 'bg-blue-100 text-blue-600'
                                }`}>
                                <AlertTriangle size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-base font-semibold ${alert.severity === 'Critical' ? 'text-red-900' :
                                            alert.severity === 'Warning' ? 'text-orange-900' : 'text-blue-900'
                                        }`}>
                                        {alert.type}: {alert.storageName}
                                    </h3>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{new Date(alert.timestamp).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                                        View Details
                                    </button>
                                    <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                                        Resolve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">All Systems Normal</h3>
                        <p className="text-gray-500">No active alerts at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

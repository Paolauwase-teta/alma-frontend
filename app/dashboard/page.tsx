'use client';

import { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
    ArrowUpRight, ArrowDownRight, Package, Eye, MousePointer, Thermometer, ChevronDown
} from 'lucide-react';
import { SensorData, Alert } from '@/app/lib/data';

const trafficData = [
    { day: 'Mon', visitors: 3200 },
    { day: 'Tue', visitors: 4100 },
    { day: 'Wed', visitors: 3800 },
    { day: 'Thu', visitors: 5200 },
    { day: 'Fri', visitors: 6478 },
    { day: 'Sat', visitors: 5800 },
    { day: 'Sun', visitors: 4900 },
];

const peakHoursData = [
    { hour: '9am', value: 1200 },
    { hour: '10am', value: 2400 },
    { hour: '11am', value: 1800 },
    { hour: '12pm', value: 3200 },
    { hour: '1pm', value: 2800 },
    { hour: '2pm', value: 2200 },
    { hour: '3pm', value: 1600 },
];

export default function DashboardPage() {
    const [sensors, setSensors] = useState<SensorData[]>([]);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sensorsRes, alertsRes] = await Promise.all([
                    fetch('/api/sensors'),
                    fetch('/api/alerts')
                ]);
                const sensorsData = await sensorsRes.json();
                const alertsData = await alertsRes.json();
                setSensors(sensorsData);
                setAlerts(alertsData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = {
        totalNodes: sensors.length,
        fresh: sensors.filter(s => s.status === 'Fresh').length,
        atRisk: sensors.filter(s => s.status === 'At Risk').length,
        avgTemp: sensors.length > 0 ? (sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length).toFixed(1) : '0',
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#4a7c59] rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 font-medium">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Nodes */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <Package size={24} className="text-orange-500" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Total Nodes</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.totalNodes}</p>
                    <div className="flex items-center gap-1 text-sm">
                        <ArrowUpRight size={16} className="text-green-500" />
                        <span className="text-green-500 font-semibold">9.8%</span>
                        <span className="text-gray-400">from last month</span>
                    </div>
                </div>

                {/* Fresh Stock */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Eye size={24} className="text-blue-500" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Fresh Stock</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.fresh}</p>
                    <div className="flex items-center gap-1 text-sm">
                        <ArrowUpRight size={16} className="text-green-500" />
                        <span className="text-green-500 font-semibold">5.9%</span>
                        <span className="text-gray-400">from last month</span>
                    </div>
                </div>

                {/* At Risk */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <MousePointer size={24} className="text-green-500" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">At Risk Items</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.atRisk}</p>
                    <div className="flex items-center gap-1 text-sm">
                        <ArrowDownRight size={16} className="text-red-500" />
                        <span className="text-red-500 font-semibold">2.1%</span>
                        <span className="text-gray-400">from last quarter</span>
                    </div>
                </div>

                {/* Avg Temperature */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <Thermometer size={24} className="text-purple-500" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Avg Temperature</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.avgTemp}°C</p>
                    <div className="flex items-center gap-1 text-sm">
                        <ArrowDownRight size={16} className="text-red-500" />
                        <span className="text-red-500 font-semibold">1.4%</span>
                        <span className="text-gray-400">from last quarter</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Traffic Overview */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Sensor Activity</h3>
                            <p className="text-sm text-gray-500">Last 7 days</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            Last 7 days
                            <ChevronDown size={16} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <p className="text-3xl font-bold text-gray-900">6,478</p>
                        <div className="flex items-center gap-1 text-sm mt-1">
                            <ArrowUpRight size={16} className="text-green-500" />
                            <span className="text-green-500 font-semibold">15%</span>
                            <span className="text-gray-400">from last month</span>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trafficData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Line type="monotone" dataKey="visitors" stroke="#4a7c59" strokeWidth={3} dot={{ fill: '#4a7c59', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hours */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Peak Hours</h3>
                            <p className="text-sm text-gray-500">Last 7 days</p>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            Last 7 days
                            <ChevronDown size={16} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <p className="text-3xl font-bold text-gray-900">4,231</p>
                        <p className="text-sm text-gray-500 mt-1">visitors in peak hour</p>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={peakHoursData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Storage Locations Table */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Storage Locations</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Last 7 days
                        <ChevronDown size={16} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Temperature</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Humidity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensors.slice(0, 5).map((sensor) => (
                                <tr key={sensor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="font-medium text-gray-900">{sensor.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${sensor.status === 'Fresh' ? 'bg-green-50 text-green-700' :
                                            sensor.status === 'At Risk' ? 'bg-orange-50 text-orange-700' :
                                                'bg-red-50 text-red-700'
                                            }`}>
                                            {sensor.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{sensor.temperature}°C</td>
                                    <td className="py-4 px-4 text-gray-600">{sensor.humidity}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

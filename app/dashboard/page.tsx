'use client';

import { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
    ArrowUpRight, ArrowDownRight, Package, Eye, MousePointer, Thermometer, ChevronDown, CheckCircle2, RefreshCw, TrendingUp
} from 'lucide-react';
import { SensorData, Alert } from '@/app/lib/data';
import Toast, { ToastType } from '@/app/components/Toast';

const generateTrafficData = (days: number) => {
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Array.from({ length: days }, (_, i) => ({
        day: days === 7 ? dayNames[i] : `Day ${i + 1}`,
        visitors: Math.floor(Math.random() * 4000) + 2000
    }));
};

const generatePeakHoursData = () => {
    const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'];
    return hours.map(hour => ({
        hour,
        value: Math.floor(Math.random() * 2500) + 1000
    }));
};

export default function DashboardPage() {
    const [sensors, setSensors] = useState<SensorData[]>([]);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [trafficData, setTrafficData] = useState(generateTrafficData(7));
    const [peakHoursData, setPeakHoursData] = useState(generatePeakHoursData());
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

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
            setToast({ message: "Failed to load dashboard data", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleTimeRangeChange = () => {
        const newRange = timeRange === '7days' ? '30days' : '7days';
        setTimeRange(newRange);
        setTrafficData(generateTrafficData(newRange === '7days' ? 7 : 30));
        setPeakHoursData(generatePeakHoursData());
        setToast({ message: `Viewing ${newRange === '7days' ? 'Last 7 days' : 'Last 30 days'}`, type: 'success' });
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setToast({ message: "Refreshing data...", type: 'info' });

        // Simulate data refresh
        await fetchData();
        setTrafficData(generateTrafficData(timeRange === '7days' ? 7 : 30));
        setPeakHoursData(generatePeakHoursData());

        setTimeout(() => {
            setIsRefreshing(false);
            setToast({ message: "Data refreshed successfully", type: 'success' });
        }, 1000);
    };

    const stats = {
        totalNodes: sensors.length,
        fresh: sensors.filter(s => s.status === 'Fresh').length,
        atRisk: sensors.filter(s => s.status === 'At Risk').length,
        avgTemp: sensors.length > 0 ? (sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length).toFixed(1) : '0',
    };

    const totalVisitors = trafficData.reduce((sum, day) => sum + day.visitors, 0);
    const avgVisitors = Math.floor(totalVisitors / trafficData.length);

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
        <div className="space-y-6 animate-fade-in">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Header with Refresh */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-500 text-sm">Real-time monitoring and analytics</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <Package size={24} className="text-orange-500" />
                        </div>
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">LIVE</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Total Nodes</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.totalNodes}</p>
                    <div className="flex items-center gap-1 text-sm bg-green-50 w-fit px-2 py-1 rounded-lg">
                        <ArrowUpRight size={16} className="text-green-600" />
                        <span className="text-green-600 font-bold">9.8%</span>
                        <span className="text-gray-500 text-xs">vs last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Eye size={24} className="text-blue-500" />
                        </div>
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">ACTIVE</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Fresh Stock</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.fresh}</p>
                    <div className="flex items-center gap-1 text-sm bg-green-50 w-fit px-2 py-1 rounded-lg">
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="text-green-600 font-bold">{((stats.fresh / stats.totalNodes) * 100).toFixed(1)}%</span>
                        <span className="text-gray-500 text-xs">of total</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <MousePointer size={24} className="text-green-500" />
                        </div>
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">ALERT</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">At Risk Items</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.atRisk}</p>
                    <div className="flex items-center gap-1 text-sm bg-orange-50 w-fit px-2 py-1 rounded-lg">
                        <ArrowDownRight size={16} className="text-orange-500" />
                        <span className="text-orange-500 font-bold">Needs attention</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <Thermometer size={24} className="text-purple-500" />
                        </div>
                        <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded-full">AVG</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Avg Temperature</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stats.avgTemp}°C</p>
                    <div className="flex items-center gap-1 text-sm bg-purple-50 w-fit px-2 py-1 rounded-lg">
                        <CheckCircle2 size={16} className="text-purple-600" />
                        <span className="text-purple-600 font-bold">Optimal</span>
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
                            <p className="text-sm text-gray-500">Real-time monitoring</p>
                        </div>
                        <button
                            onClick={handleTimeRangeChange}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 active:scale-95"
                        >
                            {timeRange === '7days' ? 'Last 7 days' : 'Last 30 days'}
                            <ChevronDown size={16} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <p className="text-3xl font-bold text-gray-900">{avgVisitors.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-sm mt-1">
                            <ArrowUpRight size={16} className="text-green-500" />
                            <span className="text-green-500 font-semibold">15%</span>
                            <span className="text-gray-400">average daily calls</span>
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
                                <Line type="monotone" dataKey="visitors" stroke="#4a7c59" strokeWidth={3} dot={{ fill: '#4a7c59', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hours */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Peak Hours</h3>
                            <p className="text-sm text-gray-500">System load distribution</p>
                        </div>
                        <button
                            onClick={handleTimeRangeChange}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 active:scale-95"
                        >
                            {timeRange === '7days' ? 'Last 7 days' : 'Last 30 days'}
                            <ChevronDown size={16} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <p className="text-3xl font-bold text-gray-900">{Math.max(...peakHoursData.map(d => d.value)).toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-1">requests in peak hour</p>
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
                                    cursor={{ fill: 'rgba(74, 124, 89, 0.1)' }}
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
                    <button
                        onClick={handleTimeRangeChange}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 active:scale-95"
                    >
                        {timeRange === '7days' ? 'Last 7 days' : 'Last 30 days'}
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
                                <tr key={sensor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
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
                                    <td className="py-4 px-4 text-gray-600 font-medium">{sensor.temperature}°C</td>
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

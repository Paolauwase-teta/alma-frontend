'use client';

import { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
    ArrowUpRight, ArrowDownRight, Package, Thermometer, ChevronDown, CheckCircle2, RefreshCw, TrendingUp, AlertTriangle
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
        <div className="space-y-6 animate-fade-in pb-12">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Header with Refresh */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight">Dashboard Overview</h2>
                    <p className="text-[var(--muted-foreground)] font-medium">Real-time agricultural monitoring & analytics</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm font-bold text-[var(--foreground)] hover:bg-[var(--muted)] transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                    Refresh Data
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] hover:border-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/5 group cursor-pointer">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Package size={28} className="text-orange-500" />
                        </div>
                        <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Live Status</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Total Nodes</p>
                    <p className="text-4xl font-black text-[var(--foreground)] mb-3">{stats.totalNodes}</p>
                    <div className="flex items-center gap-2 text-sm bg-green-500/10 w-fit px-3 py-1.5 rounded-xl border border-green-500/10">
                        <ArrowUpRight size={18} className="text-green-500" />
                        <span className="text-green-500 font-black">9.8%</span>
                        <span className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-tighter">vs last month</span>
                    </div>
                </div>

                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] hover:border-green-500/30 transition-all hover:shadow-2xl hover:shadow-green-500/5 group cursor-pointer">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={28} className="text-green-500" />
                        </div>
                        <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Operational</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Fresh Stock</p>
                    <p className="text-4xl font-black text-[var(--foreground)] mb-3">{stats.fresh}</p>
                    <div className="flex items-center gap-2 text-sm bg-green-500/10 w-fit px-3 py-1.5 rounded-xl border border-green-500/10">
                        <TrendingUp size={18} className="text-green-500" />
                        <span className="text-green-500 font-black">{((stats.fresh / stats.totalNodes) * 100).toFixed(1)}%</span>
                        <span className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-tighter">Healthy</span>
                    </div>
                </div>

                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] hover:border-red-500/30 transition-all hover:shadow-2xl hover:shadow-red-500/5 group cursor-pointer">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <AlertTriangle size={28} className="text-red-500" />
                        </div>
                        <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Critical</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">At Risk Items</p>
                    <p className="text-4xl font-black text-[var(--foreground)] mb-3">{stats.atRisk}</p>
                    <div className="flex items-center gap-2 text-sm bg-red-500/10 w-fit px-3 py-1.5 rounded-xl border border-red-500/10">
                        <ArrowDownRight size={18} className="text-red-500" />
                        <span className="text-red-500 font-black">Requires Action</span>
                    </div>
                </div>

                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] hover:border-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/5 group cursor-pointer">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Thermometer size={28} className="text-purple-500" />
                        </div>
                        <span className="text-[10px] font-black text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Average</span>
                    </div>
                    <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Avg Temperature</p>
                    <p className="text-4xl font-black text-[var(--foreground)] mb-3">{stats.avgTemp}°C</p>
                    <div className="flex items-center gap-2 text-sm bg-purple-500/10 w-fit px-3 py-1.5 rounded-xl border border-purple-500/10">
                        <CheckCircle2 size={18} className="text-purple-500" />
                        <span className="text-purple-500 font-black">Within Range</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Traffic Overview */}
                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight">Sensor Activity</h3>
                            <p className="text-sm text-[var(--muted-foreground)] font-medium">Network load distribution</p>
                        </div>
                        <button
                            onClick={handleTimeRangeChange}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)] hover:text-green-600 hover:bg-[var(--muted)] rounded-xl transition-all border border-[var(--border)] active:scale-95"
                        >
                            {timeRange === '7days' ? '7 Days' : '30 Days'}
                            <ChevronDown size={14} />
                        </button>
                    </div>
                    <div className="mb-8">
                        <p className="text-4xl font-black text-[var(--foreground)] tracking-tighter">{avgVisitors.toLocaleString()}</p>
                        <div className="flex items-center gap-2 text-xs mt-2 font-black uppercase tracking-widest">
                            <ArrowUpRight size={16} className="text-green-500" />
                            <span className="text-green-500">15% increase</span>
                            <span className="text-[var(--muted-foreground)]">avg daily calls</span>
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trafficData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                        color: 'var(--foreground)'
                                    }}
                                    itemStyle={{ color: 'var(--foreground)', fontWeight: 800 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="visitors"
                                    stroke="#22c55e"
                                    strokeWidth={4}
                                    dot={{ fill: '#22c55e', r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hours */}
                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight">Molecular Freshness Trend</h3>
                            <p className="text-sm text-[var(--muted-foreground)] font-medium">VOC concentration monitoring across all nodes</p>
                        </div>
                        <button
                            onClick={handleTimeRangeChange}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)] hover:text-purple-600 hover:bg-[var(--muted)] rounded-xl transition-all border border-[var(--border)] active:scale-95"
                        >
                            {timeRange === '7days' ? '7 Days' : '30 Days'}
                            <ChevronDown size={14} />
                        </button>
                    </div>
                    <div className="mb-8">
                        <p className="text-4xl font-black text-[var(--foreground)] tracking-tighter">{Math.max(...peakHoursData.map(d => d.value)).toLocaleString()}</p>
                        <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)] mt-2">Peak hourly throughput</p>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={peakHoursData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis
                                    dataKey="hour"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                                    }}
                                    cursor={{ fill: 'var(--muted)', radius: 12 }}
                                />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Storage Locations Table */}
            <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight">Storage Facility Health</h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/10">All Systems Nominal</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border)]">
                                <th className="text-left py-4 px-4 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Location</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Status</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Temp</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Humidity</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Molecular Index</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {sensors.slice(0, 5).map((sensor) => (
                                <tr key={sensor.id} className="hover:bg-[var(--muted)]/50 transition-colors group">
                                    <td className="py-5 px-4 font-bold text-[var(--foreground)]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                            {sensor.name}
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${sensor.status === 'Fresh' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            sensor.status === 'At Risk' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {sensor.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 font-black text-[var(--foreground)]">{sensor.temperature}°C</td>
                                    <td className="py-5 px-4 font-bold text-[var(--muted-foreground)]">{sensor.humidity}%</td>
                                    <td className="py-5 px-4">
                                        <div className="w-full max-w-[100px] h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${sensor.status === 'Fresh' ? 'bg-green-500' : 'bg-orange-500'}`}
                                                style={{ width: `${Math.random() * 40 + 60}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

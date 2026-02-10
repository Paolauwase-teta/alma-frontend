'use client';

import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const analyticsData = [
    { name: 'Mon', revenue: 4000, expenses: 2400 },
    { name: 'Tue', revenue: 3000, expenses: 1398 },
    { name: 'Wed', revenue: 2000, expenses: 9800 },
    { name: 'Thu', revenue: 2780, expenses: 3908 },
    { name: 'Fri', revenue: 1890, expenses: 4800 },
    { name: 'Sat', revenue: 2390, expenses: 3800 },
    { name: 'Sun', revenue: 3490, expenses: 4300 },
];

const pieData = [
    { name: 'Fresh', value: 400, color: '#4a7c59' },
    { name: 'At Risk', value: 300, color: '#f97316' },
    { name: 'Spoiled', value: 300, color: '#ef4444' },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
                    <p className="text-gray-500 text-sm">Detailed insights into your operations</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Calendar size={16} />
                        This Week
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#4a7c59] text-white rounded-lg text-sm font-medium hover:bg-[#3d6849] transition-colors shadow-sm">
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Spoilage Saved</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">$12,450</h3>
                    <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <ArrowUpRight size={16} />
                        <span>12.5%</span>
                        <span className="text-gray-400 font-normal ml-1">vs last month</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Efficiency Rate</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">94.2%</h3>
                    <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <ArrowUpRight size={16} />
                        <span>4.2%</span>
                        <span className="text-gray-400 font-normal ml-1">vs last month</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-1">Alert Response Time</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">1.5 hrs</h3>
                    <div className="flex items-center gap-1 text-sm text-red-600 font-medium">
                        <ArrowDownRight size={16} />
                        <span>-15%</span>
                        <span className="text-gray-400 font-normal ml-1">Improvement</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue vs Expenses</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4a7c59" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4a7c59" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#4a7c59" fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorExpenses)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Inventory status</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { Package, Search, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { SensorData } from '@/app/lib/data';
import Toast, { ToastType } from '@/app/components/Toast';

export default function InventoryPage() {
    const [inventory, setInventory] = useState<SensorData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await fetch('/api/sensors');
                const data = await res.json();
                setInventory(data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
                setToast({ message: "Failed to load inventory", type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddItem = () => {
        // Simulate adding item
        setToast({ message: "Opening 'Add Item' modal...", type: 'info' });
    };

    const handleFilterToggle = () => {
        setShowFilter(!showFilter);
        setToast({ message: showFilter ? "Filters hidden" : "Filters shown", type: 'info' });
    };

    const handleAction = (id: string) => {
        setToast({ message: `Managing item #${id.substring(0, 8)}`, type: 'info' });
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#4a7c59] rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 font-medium">Loading Inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                    <p className="text-gray-500 text-sm">Track and manage your storage locations</p>
                </div>
                <button
                    onClick={handleAddItem}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm active:scale-95"
                >
                    <Plus size={20} />
                    Add Item
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search inventory..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-colors"
                        />
                    </div>
                    <button
                        onClick={handleFilterToggle}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${showFilter
                                ? 'bg-gray-100 border-gray-300 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 border-gray-200'
                            }`}
                    >
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                {showFilter && (
                    <div className="p-4 bg-gray-50 border-b border-gray-100 animate-slide-up">
                        <div className="flex gap-4">
                            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#4a7c59]">
                                <option>All Statuses</option>
                                <option>Fresh</option>
                                <option>At Risk</option>
                                <option>Spoiled</option>
                            </select>
                            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#4a7c59]">
                                <option>All Types</option>
                                <option>Warehouse</option>
                                <option>Transport</option>
                                <option>Retail</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item Name</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Storage ID</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Temp</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Humidity</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Update</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInventory.length > 0 ? (
                                filteredInventory.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#e8f0ec] rounded-lg flex items-center justify-center text-[#4a7c59]">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            #{item.id.substring(0, 8)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Fresh' ? 'bg-green-50 text-green-700' :
                                                item.status === 'At Risk' ? 'bg-orange-50 text-orange-700' :
                                                    'bg-red-50 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Fresh' ? 'bg-green-500' :
                                                    item.status === 'At Risk' ? 'bg-orange-500' :
                                                        'bg-red-500'
                                                    }`}></span>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                                            {item.temperature}°C
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {item.humidity}%
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            2 mins ago
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => handleAction(item.id)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                                            >
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-500">
                                        No items found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                    <p className="text-sm text-gray-500">Showing {filteredInventory.length} items</p>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded bg-white text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            disabled
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>
                        <button
                            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded bg-white text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

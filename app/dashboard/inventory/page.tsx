'use client';

import { useState, useEffect, useMemo } from 'react';
import { Package, Search, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight, ArrowUpDown, Trash2, Edit } from 'lucide-react';
import { SensorData } from '@/app/lib/data';
import Toast, { ToastType } from '@/app/components/Toast';

export default function InventoryPage() {
    const [inventory, setInventory] = useState<SensorData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [sortField, setSortField] = useState<'name' | 'temperature' | 'humidity'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
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

    // Real filtering and sorting logic
    const filteredAndSortedInventory = useMemo(() => {
        let filtered = inventory.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            const matchesType = typeFilter === 'all' || item.type === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });

        // Sort
        filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [inventory, searchTerm, statusFilter, typeFilter, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedInventory.length / itemsPerPage);
    const paginatedInventory = filteredAndSortedInventory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (field: 'name' | 'temperature' | 'humidity') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleDeleteItem = (id: string, name: string) => {
        setInventory(prev => prev.filter(item => item.id !== id));
        setToast({ message: `Deleted ${name}`, type: 'success' });
        // Reset to page 1 if current page is now empty
        if (paginatedInventory.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddItem = () => {
        const newItem: SensorData = {
            id: `new-${Date.now()}`,
            name: `Storage Unit ${inventory.length + 1}`,
            type: 'Warehouse',
            status: 'Fresh',
            temperature: Math.floor(Math.random() * 10) + 2,
            humidity: Math.floor(Math.random() * 20) + 60,
            lastUpdate: new Date().toISOString()
        };
        setInventory(prev => [newItem, ...prev]);
        setCurrentPage(1); // Go to first page to see new item
        setToast({ message: "New item added successfully!", type: 'success' });
    };

    const handleFilterToggle = () => {
        setShowFilter(!showFilter);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
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
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#4a7c59]"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Fresh">Fresh</option>
                                <option value="At Risk">At Risk</option>
                                <option value="Spoiled">Spoiled</option>
                            </select>
                            <select
                                value={typeFilter}
                                onChange={(e) => {
                                    setTypeFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#4a7c59]"
                            >
                                <option value="all">All Types</option>
                                <option value="Warehouse">Warehouse</option>
                                <option value="Transport">Transport</option>
                                <option value="Retail">Retail</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <button
                                        onClick={() => handleSort('name')}
                                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                                    >
                                        Item Name
                                        <ArrowUpDown size={14} className={sortField === 'name' ? 'text-[#4a7c59]' : ''} />
                                    </button>
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Storage ID</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <button
                                        onClick={() => handleSort('temperature')}
                                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                                    >
                                        Temp
                                        <ArrowUpDown size={14} className={sortField === 'temperature' ? 'text-[#4a7c59]' : ''} />
                                    </button>
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <button
                                        onClick={() => handleSort('humidity')}
                                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                                    >
                                        Humidity
                                        <ArrowUpDown size={14} className={sortField === 'humidity' ? 'text-[#4a7c59]' : ''} />
                                    </button>
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Update</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedInventory.length > 0 ? (
                                paginatedInventory.map((item) => (
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
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setToast({ message: `Editing ${item.name}`, type: 'info' })}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item.id, item.name)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-500">
                                        No items found matching your filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                    <p className="text-sm text-gray-500">
                        Showing {paginatedInventory.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredAndSortedInventory.length)} of {filteredAndSortedInventory.length} items
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded bg-white text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${currentPage === page
                                            ? 'bg-[#4a7c59] text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-3 py-1 border border-gray-200 rounded bg-white text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

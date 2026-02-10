'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home, Users, TrendingUp, Settings, HelpCircle, Search, Bell,
    ChevronDown, Package, AlertTriangle, LogOut, Menu, X
} from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Check for user in localStorage
        const userData = localStorage.getItem('alma_user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Set default placeholder user if not logged in (or redirect, but for this request we want placeholder)
            setUser({
                name: 'Niyobyose ISAAC',
                email: 'niyobyose.isaac@alma.com'
            });
        }
    }, []);

    const navItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Package, label: 'Inventory', href: '/dashboard/inventory' },
        { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
        { icon: AlertTriangle, label: 'Alerts', href: '/dashboard/alerts' },
        { icon: Users, label: 'Team', href: '/dashboard/team' },
    ];

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
                        <Link href="/" className="flex items-center gap-2 group">
                            <AlmaLogo className="w-10 h-10" />
                            <span className="text-xl font-black text-gray-900">ALMA</span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="px-4 py-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-2">
                        <p className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Navigation</p>
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-[#4a7c59] text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <p className="px-3 mt-8 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</p>
                        <div className="space-y-1">
                            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                <Settings size={20} />
                                Settings
                            </button>
                            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                <HelpCircle size={20} />
                                Help Center
                            </button>
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#4a7c59] to-[#3d6849] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase() || 'N'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate capitalize">{user?.name || 'Niyobyose ISAAC'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@alma.com'}</p>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('alma_user');
                                    router.push('/login');
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden text-gray-600"
                            >
                                <Menu size={24} />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#4a7c59] to-[#3d6849] rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    {user?.name?.charAt(0).toUpperCase() || 'N'}
                                </div>
                                <span className="text-sm font-semibold text-gray-900 capitalize">{user?.name || 'Niyobyose ISAAC'}</span>
                                <ChevronDown size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

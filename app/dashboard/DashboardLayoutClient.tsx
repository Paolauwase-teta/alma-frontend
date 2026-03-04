'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home, Users, TrendingUp, Settings, HelpCircle, Search, Bell,
    ChevronDown, Package, AlertTriangle, LogOut, Menu, X
} from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';
import Toast, { ToastType } from '@/app/components/Toast';

import { useTheme } from 'next-themes';

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check for user in localStorage
        const userData = localStorage.getItem('alma_user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser({
                name: 'Niyobyose ISAAC',
                email: 'niyobyose.isaac@alma.com'
            });
        }
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const navItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Package, label: 'Inventory', href: '/dashboard/inventory' },
        { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
        { icon: AlertTriangle, label: 'Alerts', href: '/dashboard/alerts' },
        { icon: Users, label: 'Team', href: '/dashboard/team' },
    ];

    const handleFeatureClick = (feature: string) => {
        setToast({ message: `${feature} feature coming soon!`, type: 'info' });
    }

    const handleProfileClick = () => {
        setToast({ message: "Profile settings coming soon!", type: 'info' });
    }

    return (
        <div className="flex h-screen bg-[var(--background)] overflow-hidden text-[var(--foreground)] transition-colors duration-300">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--card)] border-r border-[var(--border)] transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-[var(--border)]">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-xl font-black text-green-600 uppercase tracking-tighter">ALMA</span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="px-4 py-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2.5 bg-[var(--muted)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-[var(--primary-light)] focus:bg-[var(--card)] transition-all"
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
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive
                                            ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                            : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
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
                            <Link
                                href="/dashboard/settings"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/dashboard/settings'
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                    }`}
                            >
                                <Settings size={20} />
                                Settings
                            </Link>
                            <Link
                                href="/dashboard/help"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/dashboard/help'
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                    }`}
                            >
                                <HelpCircle size={20} />
                                Help Center
                            </Link>
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-[var(--border)]">
                        <div className="flex items-center gap-3 px-3 py-3 bg-[var(--muted)] rounded-2xl cursor-pointer hover:bg-[var(--border)] transition-all shadow-sm" onClick={handleProfileClick}>
                            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">
                                {user?.name?.charAt(0).toUpperCase() || 'N'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-[var(--foreground)] truncate capitalize">{user?.name || 'Niyobyose ISAAC'}</p>
                                <p className="text-[10px] text-[var(--muted-foreground)] font-bold truncate uppercase tracking-wider">{user?.email || 'user@alma.com'}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    localStorage.removeItem('alma_user');
                                    router.push('/login');
                                }}
                                className="text-[var(--muted-foreground)] hover:text-red-500 rounded-xl p-1.5 hover:bg-black/5 transition-all"
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
                <header className="bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4 sticky top-0 z-10 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden text-[var(--foreground)]"
                            >
                                <Menu size={24} />
                            </button>
                            <h1 className="text-2xl font-black text-green-700 tracking-tight transition-colors duration-300">
                                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 text-[var(--muted-foreground)] hover:text-green-600 hover:bg-[var(--muted)] rounded-xl transition-all active:scale-95 border border-transparent hover:border-[var(--border)]"
                                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {mounted && theme === 'dark' ? (
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                onClick={() => handleFeatureClick('Notifications')}
                                className="relative p-2.5 text-[var(--muted-foreground)] hover:text-green-600 hover:bg-[var(--muted)] rounded-xl transition-all active:scale-95 border border-transparent hover:border-[var(--border)]"
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm"></span>
                            </button>

                            <div
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 px-3 py-2 bg-[var(--muted)] border border-transparent hover:border-[var(--border)] rounded-2xl cursor-pointer hover:bg-[var(--card)] transition-all shadow-sm"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-white font-black text-xs shadow-md">
                                    {user?.name?.charAt(0).toUpperCase() || 'N'}
                                </div>
                                <span className="text-sm font-black text-[var(--foreground)] capitalize hidden sm:block truncate max-w-[120px]">{user?.name || 'Niyobyose ISAAC'}</span>
                                <ChevronDown size={16} className="text-[var(--muted-foreground)]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-[var(--background)] transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}

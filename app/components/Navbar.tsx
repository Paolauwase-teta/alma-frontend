'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ShoppingBag, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import ThemeToggle from '@/app/components/ThemeToggle';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        const handleClickOutside = (event: MouseEvent) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setShowAccountMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        {
            name: 'Services',
            href: '/services',
            dropdown: [
                { name: 'Storage', href: '/services/storage' },
                { name: 'Logistics', href: '/services/logistics' },
                { name: 'Retail', href: '/services/retail' },
            ]
        },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-[family-name:var(--font-jost)] bg-[var(--background)] py-4 border-b border-[var(--border)] shadow-sm`}
        >
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex flex-col -space-y-1">
                        <span className="text-2xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-none">ALMA</span>
                        <span className="text-[8px] font-bold text-green-600 uppercase tracking-[0.2em]">Eco-Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Navigation Links - Center Aligned */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group/item">
                            <Link
                                href={link.href}
                                className={`flex items-center gap-1.5 text-[15px] font-semibold transition-all hover:text-green-600 ${pathname === link.href
                                    ? 'text-green-600'
                                    : 'text-[var(--foreground)]'
                                    }`}
                            >
                                {link.name}
                                {link.dropdown && <ChevronDown size={14} className="opacity-50" />}
                            </Link>

                            {link.dropdown && (
                                <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 translate-y-2 group-hover/item:translate-y-0">
                                    <div className="bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] p-4 min-w-[200px]">
                                        {link.dropdown.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-green-600 hover:bg-[var(--muted)] rounded-xl transition-all"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Actions: Icons + Button */}
                <div className="hidden lg:flex items-center gap-6 text-[var(--foreground)]">
                    <ThemeToggle />

                    <div className="relative" ref={accountMenuRef}>
                        <button
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                            className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all bg-[var(--card)] hover:bg-[var(--muted)] hover:border-green-600 hover:text-green-600"
                        >
                            <User size={20} />
                        </button>

                        {/* Account Dropdown */}
                        {showAccountMenu && (
                            <div className="absolute top-full right-0 mt-4 bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] p-3 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-300">
                                <Link
                                    href="/login"
                                    className="flex items-center gap-3 px-4 py-3 text-[15px] font-semibold text-[var(--foreground)] hover:text-green-600 hover:bg-[var(--muted)] rounded-xl transition-all"
                                    onClick={() => setShowAccountMenu(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="flex items-center gap-3 px-4 py-3 text-[15px] font-semibold text-[var(--foreground)] hover:text-green-600 hover:bg-[var(--muted)] rounded-xl transition-all"
                                    onClick={() => setShowAccountMenu(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <button className="w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center transition-all hover:bg-[var(--muted)] hover:border-green-600 hover:text-green-600 relative">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">0</span>
                    </button>

                    <Link
                        href="/signup"
                        className="px-8 py-3 bg-green-600 text-white rounded-2xl font-bold text-[13px] uppercase tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-green-600/20"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 lg:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-xl text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <div className={`lg:hidden fixed inset-0 bg-[var(--background)] z-[110] transition-all duration-500 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="p-6 flex flex-col h-full bg-[var(--background)]">
                    <div className="flex justify-between items-center mb-12">
                        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <div className="flex flex-col -space-y-1">
                                <span className="text-xl font-black text-[var(--foreground)] tracking-tighter uppercase leading-none">ALMA</span>
                                <span className="text-[8px] font-bold text-green-600 uppercase tracking-[0.2em]">Eco-Intelligence</span>
                            </div>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="p-3 bg-[var(--muted)] rounded-2xl">
                            <X size={24} className="text-[var(--foreground)]" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-6">
                        {navLinks.map((link) => (
                            <div key={link.name} className="animate-fade-in">
                                <Link
                                    href={link.href}
                                    onClick={() => !link.dropdown && setIsOpen(false)}
                                    className="text-4xl font-black text-[var(--foreground)] hover:text-green-600 transition-colors uppercase tracking-tight flex items-center justify-between"
                                >
                                    {link.name}
                                </Link>
                                {link.dropdown && (
                                    <div className="mt-4 grid grid-cols-2 gap-4 pl-2 font-jost">
                                        {link.dropdown.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-lg font-bold text-[var(--muted-foreground)]"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-10 border-t border-[var(--border)] flex flex-col gap-6 font-jost">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-bold text-[var(--foreground)]"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            onClick={() => setIsOpen(false)}
                            className="w-full h-16 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center text-lg uppercase tracking-widest shadow-xl shadow-green-600/20"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

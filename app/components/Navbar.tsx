'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, ShoppingBag, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import AlmaLogo from './AlmaLogo';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-[family-name:var(--font-jost)] ${scrolled ? 'bg-white shadow-lg py-4' : 'bg-white py-6'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex flex-col -space-y-1">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">ALMA</span>
                        <span className="text-[8px] font-bold text-green-600 uppercase tracking-[0.2em]">Eco-Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Navigation Links - Center Aligned */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group/item">
                            <Link
                                href={link.href}
                                className={`flex items-center gap-1.5 text-[15px] font-semibold transition-all hover:text-green-600 ${pathname === link.href ? 'text-green-600' : 'text-slate-700'
                                    }`}
                            >
                                {link.name}
                                {link.dropdown && <ChevronDown size={14} className="opacity-50" />}
                            </Link>

                            {/* Optional Dropdown for Services/Shop */}
                            {link.dropdown && (
                                <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 translate-y-2 group-hover/item:translate-y-0">
                                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-50 p-4 min-w-[200px]">
                                        {link.dropdown.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
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
                <div className="hidden lg:flex items-center gap-6">
                    <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all relative">
                        <User size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all relative">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">0</span>
                    </button>
                    <Link
                        href="/signup"
                        className="px-8 py-3.5 bg-[#1a1a1a] text-white rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-slate-900 p-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            <div className={`lg:hidden fixed inset-0 bg-white z-[110] transition-all duration-500 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-12">
                        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">ALMA</span>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-50 rounded-2xl">
                            <X size={24} className="text-slate-900" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-6">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => !link.dropdown && setIsOpen(false)}
                                    className="text-4xl font-black text-slate-900 hover:text-green-600 transition-colors uppercase tracking-tight flex items-center justify-between"
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
                                                className="text-lg font-bold text-slate-500"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex flex-col gap-6 font-jost">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-bold text-slate-900"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            onClick={() => setIsOpen(false)}
                            className="w-full h-16 bg-[#1a1a1a] text-white rounded-2xl font-bold flex items-center justify-center text-lg uppercase tracking-widest shadow-xl"
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

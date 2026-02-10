'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-300 px-4`}>
            <div className={`w-full max-w-5xl rounded-full px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled
                    ? 'bg-[#1a3a2e]/90 backdrop-blur-md shadow-xl border border-white/10'
                    : 'bg-[#1a3a2e]/40 backdrop-blur-sm border border-white/10'
                }`}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <AlmaLogo className="w-8 h-8 text-white" />
                    <span className="text-lg font-bold text-white tracking-tight">ALMA</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors relative ${isActive
                                        ? 'text-white'
                                        : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2.5 bg-[#4a7c59] text-white rounded-full font-bold text-sm hover:bg-[#3d6849] transition-all shadow-lg shadow-[#4a7c59]/20"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-2"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="absolute top-full mt-4 left-4 right-4 bg-[#1a3a2e] rounded-3xl p-6 shadow-2xl border border-white/10 animate-scale-in origin-top">
                    <div className="space-y-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-2xl text-base font-semibold transition-all ${isActive
                                            ? 'text-white bg-white/10'
                                            : 'text-white/60 hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <div className="pt-4 mt-2 flex flex-col gap-3 border-t border-white/10">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block text-center text-white/80 hover:text-white font-semibold"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="block text-center px-4 py-3 bg-[#4a7c59] text-white rounded-xl font-bold text-sm hover:bg-[#3d6849] transition-all"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

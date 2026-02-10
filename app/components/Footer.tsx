import Link from 'next/link';
import { Leaf, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[#1a3a2e]/10">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-[#1a3a2e] p-2.5 rounded-2xl group-hover:bg-[#4a7c59] transition-all">
                                <Leaf size={24} fill="white" className="text-white" />
                            </div>
                            <span className="text-2xl font-black text-[#1a3a2e] tracking-tight">ALMA</span>
                        </Link>
                        <p className="text-[#1a3a2e]/60 leading-relaxed">
                            Unleash the full potential of your food supply chain with molecular-level preservation technology.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#f5f5f5] hover:bg-[#4a7c59] rounded-full flex items-center justify-center transition-all group"
                            >
                                <Twitter size={18} className="text-[#1a3a2e] group-hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#f5f5f5] hover:bg-[#4a7c59] rounded-full flex items-center justify-center transition-all group"
                            >
                                <Linkedin size={18} className="text-[#1a3a2e] group-hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#f5f5f5] hover:bg-[#4a7c59] rounded-full flex items-center justify-center transition-all group"
                            >
                                <Instagram size={18} className="text-[#1a3a2e] group-hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#f5f5f5] hover:bg-[#4a7c59] rounded-full flex items-center justify-center transition-all group"
                            >
                                <Youtube size={18} className="text-[#1a3a2e] group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-[#1a3a2e] mb-4 uppercase tracking-wider text-sm">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-[#1a3a2e] mb-4 uppercase tracking-wider text-sm">Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#services" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Warehouse Monitoring
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Supply Chain Tracking
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Retail Integration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="font-bold text-[#1a3a2e] mb-4 uppercase tracking-wider text-sm">Account</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/login" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-[#1a3a2e]/60 hover:text-[#4a7c59] transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1a3a2e]/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#1a3a2e]/50">
                        © 2026 ALMA Project. Contributing to SDG 2 & SDG 12.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/dashboard" className="text-sm text-[#1a3a2e]/50 hover:text-[#4a7c59] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/dashboard" className="text-sm text-[#1a3a2e]/50 hover:text-[#4a7c59] transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

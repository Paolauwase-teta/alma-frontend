'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-[var(--background)] min-h-screen font-[family-name:var(--font-jost)] pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Side: Content & Info */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] border border-green-100">
                                <MessageSquare size={14} fill="currentColor" className="opacity-20" /> CONTACT US
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--foreground)] leading-[1.1] tracking-tighter">
                                Let's <span className="text-green-600">Secure</span> <br />
                                Your Supply <br />
                                Chain.
                            </h1>
                            <p className="text-lg text-[var(--muted-foreground)] font-medium max-w-md leading-relaxed">
                                Have questions about our sensor technology or marketplace? Our team is available 24/7 to help you optimize your agricultural flow.
                            </p>
                        </div>

                        {/* Contact Info Boxes */}
                        <div className="space-y-4 max-w-lg">
                            {/* Email */}
                            <div className="flex items-center gap-6 p-6 bg-[var(--muted)] border border-[var(--border)] rounded-[32px] group hover:bg-green-600 hover:border-green-600 transition-all duration-500 text-left">
                                <div className="w-14 h-14 bg-[var(--card)] rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-[var(--border)] group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.3em] mb-1 group-hover:text-white/70">Email Us</p>
                                    <p className="text-xl font-semibold text-[var(--foreground)] group-hover:text-white transition-colors">hello@alma.agri</p>
                                </div>
                            </div>

                            {/* Call */}
                            <div className="flex items-center gap-6 p-6 bg-[var(--muted)] border border-[var(--border)] rounded-[32px] group hover:bg-green-600 hover:border-green-600 transition-all duration-500 text-left">
                                <div className="w-14 h-14 bg-[var(--card)] rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-[var(--border)] group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.3em] mb-1 group-hover:text-white/70">Call Us</p>
                                    <p className="text-xl font-semibold text-[var(--foreground)] group-hover:text-white transition-colors">+250 788 000 000</p>
                                </div>
                            </div>

                            {/* Visit */}
                            <div className="flex items-center gap-6 p-6 bg-[var(--muted)] border border-[var(--border)] rounded-[32px] group hover:bg-green-600 hover:border-green-600 transition-all duration-500 text-left">
                                <div className="w-14 h-14 bg-[var(--card)] rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-[var(--border)] group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.3em] mb-1 group-hover:text-white/70">Visit Us</p>
                                    <p className="text-xl font-semibold text-[var(--foreground)] group-hover:text-white transition-colors">Kigali Innovation City, Rwanda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form Container - White & Green Brand */}
                    <div className="w-full lg:w-[500px] xl:w-[580px]">
                        <div className="bg-[var(--card)] p-10 md:p-14 rounded-[50px] shadow-[0_40px_100px_-20px_rgba(34,197,94,0.15)] border border-[var(--border)]">
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Full Name */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-green-600 uppercase tracking-[0.3em] ml-2 font-[family-name:var(--font-jost)]">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                                        />
                                    </div>
                                    {/* Email Address */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-green-600 uppercase tracking-[0.3em] ml-2 font-[family-name:var(--font-jost)]">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-green-600 uppercase tracking-[0.3em] ml-2 font-[family-name:var(--font-jost)]">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="General Inquiry"
                                        className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                                    />
                                </div>

                                {/* Your Message */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-green-600 uppercase tracking-[0.3em] ml-2 font-[family-name:var(--font-jost)]">Your Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us about your needs..."
                                        className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-6 py-4 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium resize-none shadow-sm"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button className="w-full bg-green-600 hover:bg-green-500 text-white rounded-2xl py-6 font-bold text-[13px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group active:scale-[0.98] shadow-lg shadow-green-600/30">
                                    SEND MESSAGE <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

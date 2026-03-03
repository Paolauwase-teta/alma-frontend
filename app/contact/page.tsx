'use client';

import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left Side: Info */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full text-green-700 text-xs font-black uppercase tracking-widest">
                                <MessageSquare size={14} fill="currentColor" />
                                Contact Us
                            </div>
                            <h1 className="text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                Let's <span className="text-green-600">Secure</span> <br />
                                Your Supply Chain.
                            </h1>
                            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                                Have questions about our sensor technology or marketplace? Our team is available 24/7 to help you optimize your agricultural flow.
                            </p>
                        </div>

                        <div className="grid gap-8 pt-6">
                            <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-green-600 transition-all duration-500">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div className="group-hover:text-white transition-colors">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Email Us</p>
                                    <p className="text-xl font-bold">hello@alma.agri</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-green-600 transition-all duration-500">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div className="group-hover:text-white transition-colors">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Call Us</p>
                                    <p className="text-xl font-bold">+250 788 000 000</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-green-600 transition-all duration-500">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <div className="group-hover:text-white transition-colors">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Visit Us</p>
                                    <p className="text-xl font-bold">Kigali Innovation City, Rwanda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-slate-900 p-12 lg:p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 blur-[100px] pointer-events-none"></div>

                        <form className="relative z-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-green-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-2xl text-white font-medium placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-green-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-2xl text-white font-medium placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-green-400 uppercase tracking-widest ml-1">Subject</label>
                                <select className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none cursor-pointer">
                                    <option className="bg-slate-900">General Inquiry</option>
                                    <option className="bg-slate-900">Product Support</option>
                                    <option className="bg-slate-900">Marketplace Partnership</option>
                                    <option className="bg-slate-900">Technical Demo</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-green-400 uppercase tracking-widest ml-1">Your Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="Tell us about your needs..."
                                    className="w-full p-8 bg-white/5 border border-white/10 rounded-3xl text-white font-medium placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full h-20 bg-green-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-green-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-600/20 active:scale-[0.98]">
                                Send Message <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

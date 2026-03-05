'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Leaf, Globe, Target, Users, ShieldCheck, ArrowRight, BarChart3, Sprout, Shield, CheckCircle2, Star } from 'lucide-react';

export default function AboutPage() {
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const targetStats = [50420, 35.2, 1248, 99.9];

    const [accuracy, setAccuracy] = useState(0);
    const targetAccuracy = 94.2;

    useEffect(() => {
        const duration = 2000; // 2 seconds for the animation
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts(targetStats.map(target => {
                const val = target * progress;
                return target % 1 === 0 ? Math.floor(val) : parseFloat(val.toFixed(1));
            }));

            setAccuracy(parseFloat((targetAccuracy * progress).toFixed(1)));

            if (currentStep >= steps) {
                clearInterval(timer);
                // Start the live fluctuation after initial count-up
                startLiveUpdates();
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const startLiveUpdates = () => {
        const liveTimer = setInterval(() => {
            setCounts(prev => [
                prev[0] + Math.floor(Math.random() * 3),
                parseFloat((35.2 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
                prev[2] + (Math.random() > 0.98 ? 1 : 0),
                prev[3]
            ]);
            setAccuracy(parseFloat((94.2 + (Math.random() * 0.2 - 0.1)).toFixed(1)));
        }, 3000);
        return () => clearInterval(liveTimer);
    };

    const statLabels = [
        { label: "Food Saved", suffix: "+", sub: "Tons Annually" },
        { label: "Waste Reduced", suffix: "%", sub: "Supply Chain Wide" },
        { label: "Active Farms", suffix: "", sub: "Globally Connected" },
        { label: "Reliability", suffix: "%", sub: "Uptime Guaranteed" }
    ];

    return (
        <div className="bg-[var(--background)] min-h-screen font-[family-name:var(--font-jost)] relative overflow-hidden">
            {/* Background Grain/Noise for premium feel */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20 text-center">
                <div className="absolute inset-0 bg-[#01110a] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2670&auto=format&fit=crop"
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#01110a]/60 via-[#01110a]/90 to-[#01110a]"></div>
                </div>

                <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-950/40 backdrop-blur-md text-green-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] border border-green-500/20 mb-10">
                        OUR JOURNEY
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8 uppercase italic-none">
                        The Soul of <span className="text-green-500">Innovation.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed opacity-90 mb-12">
                        ALMA is on a mission to reshape how we manage food resources using cutting-edge science and technology, ensuring a sustainable future for everyone.
                    </p>
                </div>
            </section>

            {/* Our Philosophy Grid */}
            <section className="px-6 py-32 bg-[var(--background)] relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-20 space-y-4">
                        <span className="text-xs font-black text-[#0a4a34] uppercase tracking-[0.5em]">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase">ROOTED IN <span className="text-[#0a4a34]">SCIENCE</span>,<br />DRIVEN BY PURPOSE.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "SDG 2: Zero Hunger",
                                desc: "Reducing food waste at storage and transportation stages to ensure more food reaches those who need it.",
                                icon: Globe,
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "SDG 12: Consumption",
                                desc: "Providing transparency and tools for warehouses, retailers, and households to manage consumption responsibly.",
                                icon: Target,
                                color: "bg-emerald-50 text-emerald-600"
                            },
                            {
                                title: "Eco-Intelligence",
                                desc: "Maximizing growth with strategic IoT monitoring and molecular guidance for total security.",
                                icon: Sprout,
                                color: "bg-green-50 text-green-600"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-10 rounded-[40px] border border-[var(--border)] bg-[var(--card)] hover:border-green-200 hover:shadow-2xl transition-all duration-500 flex flex-col items-start h-full">
                                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-[var(--muted-foreground)] text-base font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* High-Tech Section - Refined Deep Green */}
            <section className="px-6 py-24 bg-[var(--background)] relative">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-[#05150e] border border-green-500/10 rounded-[60px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-2xl">
                        {/* Decorative Glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px]"></div>

                        <div className="w-full lg:w-3/5 space-y-10 relative z-10 text-left">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.5em]">High-Tech Intelligence</span>
                                <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight uppercase text-white">
                                    THE SCIENCE OF <br />
                                    <span className="text-green-500">SPOILAGE.</span>
                                </h2>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl font-medium">
                                Traditional systems rely on visible signs of decay. ALMA's sensors detect Volatile Organic Compounds (VOCs) and Ethylene gas—the chemical precursors to spoilage—at concentrations as low as 10 parts per billion.
                            </p>

                            <div className="flex flex-wrap gap-12 pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full border border-green-500/30 flex items-center justify-center text-green-500">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black tracking-tight text-white uppercase tabular-nums">{accuracy}%</span>
                                        <span className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em]">Accuracy Rate</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full border border-green-500/30 flex items-center justify-center text-green-500">
                                        <Shield size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black tracking-tight text-white uppercase">Real-Time</span>
                                        <span className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em]">Early Detection</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 flex justify-center relative z-10">
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#0a1a14] rounded-[60px] border border-green-500/20 flex items-center justify-center shadow-inner group">
                                <Users size={120} className="text-white/10 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            {/* Inner Border Square Effect */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-72 h-72 md:w-96 md:h-96 border border-white/5 rounded-[80px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section - White Version */}
            <section className="px-6 py-32 bg-[var(--background)] border-y border-[var(--border)] relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                    <div className="inline-flex items-center px-8 py-3 bg-[#0a4a34] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-green-900/20 mb-10">
                        GLOBAL IMPACT
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] leading-[1.1] tracking-tighter mb-16 uppercase italic-none">
                        Protecting Our <span className="text-[#0a4a34]">Ecosystem.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full">
                        {counts.map((count, i) => (
                            <div key={i} className="flex flex-col items-center group cursor-default">
                                <span className="text-5xl font-black text-[var(--foreground)] tracking-tighter mb-2 group-hover:text-[#0a4a34] transition-colors uppercase tabular-nums">
                                    {i === 0 ? count.toLocaleString() : count}{statLabels[i].suffix}
                                </span>
                                <span className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.3em] mb-1">{statLabels[i].label}</span>
                                <span className="text-[var(--muted-foreground)] text-[10px] font-medium uppercase tracking-widest">{statLabels[i].sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Innovators */}
            <section className="px-6 py-32 bg-[var(--background)] relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-left mb-20 space-y-4">
                        <span className="text-xs font-black text-[#0a4a34] uppercase tracking-[0.5em]">The Team</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase">MEET THE <span className="text-[#0a4a34]">INNOVATORS</span>.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alice Chen", role: "Chief Scientist", img: "/alice.png", bio: "Molecular biologist specialized in gas signatures." },
                            { name: "Bob Richards", role: "Logistics Lead", img: "/bob.png", bio: "Expert in global cold-chain infrastructure." },
                            { name: "Charlie Okafor", role: "Software Architect", img: "/charlie.png", bio: "Pioneer in agricultural blockchain transparency." }
                        ].map((member, i) => (
                            <div key={i} className="group p-10 rounded-[40px] border border-[var(--border)] bg-[var(--card)] hover:border-green-200 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--border)] mb-8 shadow-inner group-hover:border-green-500/20 transition-colors">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                                <h3 className="text-2xl font-black text-[var(--foreground)] mb-2 uppercase tracking-tight">{member.name}</h3>
                                <span className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.3em] mb-4 block">{member.role}</span>
                                <p className="text-[var(--muted-foreground)] text-base font-medium leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Sophisticated Deep Green (Not bright) */}
            <section className="py-32 px-6 bg-[var(--background)]">
                <div className="max-w-6xl mx-auto bg-[#05150e] border border-green-500/10 rounded-[60px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden isolate shadow-2xl">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic-none">
                        Ready to protect <br /> your ecosystem?
                    </h2>
                    <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto">
                        Join the global network of suppliers and supermarkets using ALMA today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        <Link
                            href="/signup"
                            className="px-12 py-6 bg-[#0a4a34] text-white rounded-2xl font-black text-[14px] uppercase tracking-[0.2em] shadow-xl shadow-green-900/20 hover:bg-[#0c5a3e] hover:scale-105 transition-all"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            href="/contact"
                            className="px-12 py-6 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black text-[14px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all active:scale-95"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

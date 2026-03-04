'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Shield, BarChart3, Sprout, Globe, Target, Mail, Phone, MapPin, ChevronRight, CheckCircle2, Cpu, Zap, Radio, Database, Star } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            title: "Molecular Freshness Sensing",
            subtitle: "CHEMICAL INTELLIGENCE",
            desc: "ALMA's proprietary gaseous sensor arrays detect the earliest chemical precursors to spoilage—Volatile Organic Compounds (VOCs) and Ethylene—at sub-nanoparticle concentrations (up to 10ppb). This allows for intervention days before visible decay occurs.",
            img: "/molecular_sensing_service_1772604196407.png",
            features: ["Gaseous Trace Detection", "Zero-Contact Scanning", "99.4% Precision Rate"]
        },
        {
            title: "Blockchain Condition Ledger",
            subtitle: "IMMUTABLE AUDIT TRAIL",
            desc: "Every environmental data point—temperature, humidity, atmospheric composition—is cryptographically hashed and recorded to a secure blockchain ledger. This creates an unalterable history of the shipment's integrity from origin to retail shelf.",
            img: "/blockchain_logistics_service_1772604233837.png",
            features: ["SHA-256 Data Integrity", "Smart Patent Tracking", "Transparent Origin Verification"]
        },
        {
            title: "Automated Logistics Hub",
            subtitle: "PREDICTIVE DISTRIBUTION",
            desc: "Our neural networks process real-time freshness data to dynamically re-route inventory. If a batch is maturing faster than expected, ALMA automatically identifies the nearest high-demand market to ensure zero waste and maximum profit.",
            img: "/automated_warehouse_hub_1772604286980.png",
            features: ["Real-time Route Optimization", "Demand Forecasting", "Warehouse Automation Integration"]
        },
        {
            title: "Community Surplus Sharing",
            subtitle: "SOCIAL IMPACT ENGINE",
            desc: "When produce reaches a critical shelf-life threshold and cannot be sold in traditional retail, ALMA's system triggers an immediate alert to a local network of food banks and community kitchens for rapid redistribution.",
            img: "/community_surplus_sharing_1772604308410.png",
            features: ["Automated Charity Matching", "Tax-Incentive Logging", "Rapid Logistics Response"]
        }
    ];

    const [telemetry, setTelemetry] = useState({ tops: 0, latency: 0 });
    const targetTelemetry = { tops: 402, latency: 11.2 };

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setTelemetry({
                tops: Math.floor(targetTelemetry.tops * progress),
                latency: parseFloat((targetTelemetry.latency * progress).toFixed(1))
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                startLiveUpdates();
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const startLiveUpdates = () => {
        const liveTimer = setInterval(() => {
            setTelemetry({
                tops: Math.floor(400 + Math.random() * 10),
                latency: parseFloat((11 + Math.random() * 2).toFixed(1))
            });
        }, 2000);
        return () => clearInterval(liveTimer);
    };

    return (
        <div className="bg-[var(--background)] min-h-screen font-[family-name:var(--font-jost)] relative overflow-hidden text-[var(--foreground)]">
            {/* Background Grain/Noise */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>

            {/* Unique Hero - Side-by-Side Layout */}
            <section className="relative min-h-screen flex items-center px-6 pt-20 border-b border-[var(--border)] bg-[var(--background)]">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative z-10 space-y-10 text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 text-[#0a4a34] rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
                            <Cpu size={14} /> TECHNICAL SOLUTIONS
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-[var(--foreground)] leading-none tracking-tighter uppercase italic-none">
                            Operational <br />
                            <span className="text-[#0a4a34]">Excellence.</span>
                        </h1>
                        <p className="text-xl text-[var(--muted-foreground)] font-medium max-w-xl leading-relaxed">
                            Beyond standard logistics—we provide a comprehensive molecular and digital infrastructure designed to eliminate systemic food waste.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link href="/contact" className="px-10 py-5 bg-[#0a4a34] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_10px_40px_-10px_rgba(10,74,52,0.4)] hover:bg-[#0c5a3e] transition-all active:scale-95">
                                Deploy Solution
                            </Link>
                            <a href="#services" className="px-10 py-5 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[var(--muted)] transition-all flex items-center gap-2">
                                Review Architecture <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative z-10 rounded-[60px] overflow-hidden border border-[var(--border)] shadow-2xl">
                            <img
                                src="/molecular_tech_detail_1772604570463.png"
                                alt="ALMA Technology Detail"
                                className="w-full h-auto object-cover scale-110"
                            />
                            {/* Overlay UI elements - Keep dark for tech feel */}
                            <div className="absolute top-10 right-10 p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl space-y-2">
                                <div className="flex items-center gap-2 text-green-400">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Sensor Node Active</span>
                                </div>
                                <p className="text-white text-lg font-black tracking-tighter uppercase tabular-nums">VOC Detected: 12ppb</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services - Alternating Staggered Sections */}
            <section id="services" className="px-6 py-32 space-y-40 bg-[var(--background)] relative z-10">
                {services.map((service, i) => (
                    <div key={i} className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`space-y-8 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                            <div className="space-y-4">
                                <span className="text-xs font-black text-[#0a4a34] uppercase tracking-[0.5em]">{service.subtitle}</span>
                                <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] uppercase tracking-tighter leading-none italic-none">{service.title}</h2>
                            </div>
                            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed font-medium">
                                {service.desc}
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                {service.features.map((feat, fi) => (
                                    <div key={fi} className="flex items-center gap-3 text-[var(--foreground)] font-bold text-sm tracking-tight">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-[#0a4a34]">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`relative group ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                            <div className="aspect-video lg:aspect-square bg-[var(--muted)] rounded-[60px] overflow-hidden border border-[var(--border)] relative shadow-inner">
                                <img src={service.img} alt={service.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 via-transparent to-transparent"></div>
                                <div className="absolute bottom-10 left-10 text-[var(--foreground)] font-black text-4xl opacity-5 uppercase tracking-tighter tabular-nums">{String(i + 1).padStart(2, '0')}</div>
                            </div>
                            {/* Decorative Corners */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-green-500/20 rounded-tr-[40px] group-hover:border-[#0a4a34] transition-colors"></div>
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-green-500/20 rounded-bl-[40px] group-hover:border-[#0a4a34] transition-colors"></div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Technical Capabilities Grid */}
            <section className="px-6 py-32 bg-[var(--muted)] relative border-y border-[var(--border)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 space-y-4">
                        <span className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.5em]">System Architecture</span>
                        <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] tracking-tight uppercase leading-none italic-none">Technical Specifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Edge Processing", desc: `Sensors perform ${telemetry.tops} TOPS of AI compute locally.`, icon: Radio },
                            { title: "Satellite Uplink", desc: "Global connectivity via Starlink integrated nodes.", icon: Globe },
                            { title: "Quantum Encryption", desc: "Military-grade encryption for proprietary data.", icon: Shield },
                            { title: "Real-time Dashboard", desc: `Latency under ${telemetry.latency}ms for global storage network.`, icon: Zap }
                        ].map((cap, i) => (
                            <div key={i} className="p-10 bg-[var(--card)] border border-[var(--border)] rounded-[40px] hover:bg-green-600/5 hover:border-[#0a4a34]/30 transition-all group shadow-sm hover:shadow-xl">
                                <div className="w-12 h-12 bg-green-600/10 text-[#0a4a34] rounded-xl flex items-center justify-center mb-8 border border-green-500/10 group-hover:bg-[#0a4a34] group-hover:text-white transition-all">
                                    <cap.icon size={24} />
                                </div>
                                <h3 className="text-xl font-black text-[var(--foreground)] mb-4 uppercase tracking-tighter">{cap.title}</h3>
                                <p className="text-[var(--muted-foreground)] text-sm font-medium leading-relaxed">{cap.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Sophisticated Deep Green */}
            <section className="py-32 px-6 bg-[var(--background)]">
                <div className="max-w-6xl mx-auto bg-[#0a4a34] rounded-[80px] p-12 md:p-32 text-center space-y-12 relative overflow-hidden isolate shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/20 rounded-full blur-[100px]"></div>

                    <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic-none">
                        Ready to <br /> Integrate?
                    </h2>
                    <p className="text-white/80 text-xl font-medium max-w-xl mx-auto">
                        Speak with our engineering team to deploy ALMA's molecular intelligence in your supply chain infrastructure.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-8">
                        <Link
                            href="/contact"
                            className="px-14 py-7 bg-white text-[#0a4a34] rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Contact Engineering
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

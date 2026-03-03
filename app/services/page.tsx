'use client';

import Link from 'next/link';
import {
    Shield,
    Sprout,
    BarChart3,
    Leaf,
    Home,
    Heart,
    ArrowRight,
    ChevronRight,
    Database,
    Smartphone,
    Zap,
    Globe
} from 'lucide-react';

export default function ServicesPage() {
    const mainServices = [
        {
            title: "Smart Storage Monitoring",
            tagline: "Molecular Freshness Control",
            desc: "Our high-precision molecular sensors monitor ethylene, VOCs, and environmental variables in real-time. We provide the intelligence needed to prevent spoilage before it happens at the origin farms and silos.",
            img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2670&auto=format&fit=crop",
            icon: Shield,
            features: ["Ethylene Detection", "Temp/Humidity Logs", "Predictive Decay AI"]
        },
        {
            title: "Food Delivery Tracking",
            tagline: "Dynamic Cold Chain Intelligence",
            desc: "Track every shipment across the global supply chain. Our devices ensure that the condition of your produce is maintained during the critical last-mile transit, with instant alerts if thresholds are breached.",
            img: "https://images.unsplash.com/photo-1586864387917-f581490217ec?q=80&w=2670&auto=format&fit=crop",
            icon: Sprout,
            features: ["Live GPS Tracking", "Shock/Light Sensors", "Blockchain Verification"]
        },
        {
            title: "Household Management",
            tagline: "Zero Waste Home Ecosystem",
            desc: "Bringing industrial-grade molecular intelligence to the home kitchen. Our smart monitoring helps families manage their inventory, receive freshness alerts, and reduce domestic food waste efficiently.",
            img: "https://images.unsplash.com/photo-1556911220-e15224bbafb0?q=80&w=2670&auto=format&fit=crop",
            icon: Home,
            features: ["Pantry Inventory", "Freshness Notifications", "Recipe Integration"]
        },
        {
            title: "Food Donation System",
            tagline: "Secure Surplus Redistribution",
            desc: "Bridging the gap between surplus inventory and those in need. Our platform securely connects supermarkets and suppliers with verified NGOs, ensuring food reaches recipients while still perfectly fresh.",
            img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2673&auto=format&fit=crop",
            icon: Heart,
            features: ["NGO Authentication", "Surplus Marketplace", "Tax Impact Reporting"]
        }
    ];

    return (
        <div className="bg-white min-h-screen font-[family-name:var(--font-jost)] pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[#0d1f18]">
                    <img
                        src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2670&auto=format&fit=crop"
                        alt="Services Hero"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f18]/20 to-[#0d1f18]"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 backdrop-blur-md text-green-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-green-500/20 mb-8">
                        ALMA TECHNOLOGY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                        Our Premium <span className="text-green-500">Services.</span>
                    </h1>
                    <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                        Revolutionizing food security through molecular intelligence, blockchain transparency, and integrated logistics.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-32">
                        {mainServices.map((service, i) => (
                            <div key={i} className={`flex flex-col lg:flex-row items-center gap-20 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Image Section */}
                                <div className="w-full lg:w-1/2 relative">
                                    <div className="aspect-[4/5] rounded-[60px] overflow-hidden relative group">
                                        <img
                                            src={service.img}
                                            alt={service.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                        <div className="absolute bottom-10 left-10">
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20">
                                                <service.icon size={32} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Decorative element */}
                                    <div className={`absolute -z-10 w-full h-full border-2 border-slate-100 rounded-[60px] translate-x-8 translate-y-8 hidden md:block`}></div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="space-y-2">
                                        <span className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">{service.tagline}</span>
                                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">{service.title}</h2>
                                    </div>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-green-600 hover:text-white transition-all cursor-default">
                                                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-white shrink-0"></div>
                                                <span className="text-sm font-bold uppercase tracking-widest">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="px-10 py-5 bg-[#1a1a1a] text-white rounded-3xl font-black text-[13px] uppercase tracking-[0.2em] shadow-xl hover:bg-green-600 transition-all flex items-center gap-4">
                                        Learn Technical Details <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack / Capabilities */}
            <section className="py-24 bg-slate-50 border-y border-slate-100 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">The ALMA Edge</h2>
                        <p className="text-slate-500 font-medium max-w-xl mx-auto">Our unique combination of hardware and software sets the standard for food safety.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { title: "Molecular Sensors", icon: Zap, color: "text-amber-500" },
                            { title: "Blockchain Verification", icon: Database, color: "text-blue-500" },
                            { title: "Global Connectivity", icon: Globe, color: "text-green-500" },
                            { title: "Mobile Accessibility", icon: Smartphone, color: "text-purple-500" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-6">
                                <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 flex items-center justify-center">
                                    <item.icon size={36} className={item.color} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight px-4">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-green-600 rounded-[60px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden isolate shadow-2xl shadow-green-600/40">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 -z-10 blur-2xl"></div>

                    <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">Ready to protect <br /> your ecosystem?</h2>
                    <p className="text-white/80 text-xl font-medium max-w-xl mx-auto">Join the global network of suppliers and supermarkets using ALMA today.</p>
                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        <Link
                            href="/signup"
                            className="px-12 py-6 bg-white text-green-700 rounded-3xl font-black text-[14px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-2xl active:scale-95"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            href="/contact"
                            className="px-12 py-6 bg-transparent border-2 border-white/30 text-white rounded-3xl font-black text-[14px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingCart, Leaf, Sprout, Tractor, Shovel, ChevronRight, Star, Shield, BarChart3, Home, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen font-[family-name:var(--font-jost)]">
      {/* Hero Section - Centered, Dark Green & Transparent (As per Screenshot) */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden pt-20 text-center">
        {/* Background Image with Dark Green Transparent Overlay */}
        <div className="absolute inset-0 bg-[#0a1a14]">
          <img 
            src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=2672&auto=format&fit=crop" 
            alt="Farm Hero" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          {/* Deep Green/Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a14]/60 via-[#0a1a14]/90 to-[#0a1a14]"></div>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-950/40 backdrop-blur-md text-green-400 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] border border-green-500/20 mb-10">
            ALMA TECHNOLOGY
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.1] tracking-tighter mb-8">
            Our Premium <span className="text-green-500">Services.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed opacity-90 mb-12">
            Revolutionizing food security through molecular intelligence, blockchain transparency, and integrated logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/signup"
              className="px-10 py-4 bg-green-600 text-white rounded-full font-bold text-[13px] uppercase tracking-[0.2em] shadow-xl shadow-green-600/20 hover:bg-green-500 hover:scale-105 transition-all active:scale-95"
            >
              Get Started Today
            </Link>
            <Link
              href="/services"
              className="px-10 py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* Floating Bottom Cards - Alma Green/Black Style (Reduced size & weight) */}
        <div className="absolute -bottom-16 left-0 right-0 z-20 px-6 hidden lg:block">
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
            {[
              { title: "Standard Security", desc: "Total food security with molecular guidance.", icon: Shield },
              { title: "Eco-Intelligence", desc: "Maximize growth with strategic IoT monitoring.", icon: BarChart3 },
              { title: "Global Protection", desc: "Safeguard assets with blockchain tech.", icon: Star }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] flex items-start gap-5 group hover:-translate-y-2 transition-all duration-500 text-left">
                <div className="w-12 h-12 bg-[#0a1a14] text-green-500 rounded-xl flex items-center justify-center shrink-0">
                  <card.icon size={22} />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-slate-900 uppercase tracking-tight mb-1">{card.title}</h3>
                  <p className="text-slate-500 text-[13px] font-medium leading-normal">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24 lg:h-32"></div>

      {/* The ALMA Ecosystem - Alma Black/Green (No Blue) */}
      <section className="px-6 py-24 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-4xl font-semibold text-[#1a1a1a] tracking-tight leading-none uppercase">The ALMA Ecosystem</h2>
            <p className="text-sm font-bold text-green-600 uppercase tracking-[0.4em]">Zero Waste from Farm to Fork</p>
            <div className="w-20 h-[3px] bg-green-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Precision Monitoring",
                desc: "Molecular sensors track every variable in real-time, preventing spoilage before it starts.",
                icon: Shield
              },
              {
                title: "Smart Logistics",
                desc: "Every shipment is tracked across a secure blockchain ledger for total transparency.",
                icon: Sprout
              },
              {
                title: "Impact Analytics",
                desc: "Data-driven insights to optimize your supply chain and eliminate waste globally.",
                icon: BarChart3
              }
            ].map((p, i) => (
              <div key={i} className="relative group p-2">
                {/* Interconnecting Corners - Alma Black style */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-[4px] border-r-[4px] border-slate-200 rounded-tr-[40px] z-10 group-hover:border-green-600 transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[4px] border-l-[4px] border-slate-200 rounded-bl-[40px] z-10 group-hover:border-green-600 transition-colors"></div>
                
                <div className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-start relative z-0 h-full text-left">
                  <div className="w-16 h-16 bg-[#1a1a1a] text-green-500 rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform">
                    <p.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4 uppercase tracking-tight">{p.title}</h3>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services - Centered Curved Path */}
      <section className="px-6 py-32 bg-[#f9fdfb] relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-28 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-green-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-green-600/20 mb-8">
              <Sprout size={16} /> Our Premium Services
            </div>
            <h2 className="text-5xl font-semibold text-slate-900 leading-[1.1] tracking-tighter mb-4">
              We follow <span className="text-green-600">Advanced</span> <br />
              Food Logistics.
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl text-center leading-relaxed">
              Unrivaled expertise in molecular sensor technology and real-time intelligence.
            </p>
          </div>

          <div className="relative w-full">
            <div className="absolute top-[20%] left-0 w-full h-full pointer-events-none hidden lg:block">
              <svg width="100%" height="400" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path 
                  d="M100 200 C 300 200, 350 400, 600 200 C 850 0, 900 200, 1100 200" 
                  stroke="#22c55e" 
                  strokeWidth="3" 
                  strokeDasharray="12 12"
                  opacity="0.4"
                  className="animate-pulse"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-0 relative z-10">
              {[
                {
                  title: "Smart Storage Monitoring",
                  desc: "Precision sensors for molecular freshness tracking.",
                  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2670&auto=format&fit=crop",
                  y: "lg:translate-y-[80px]"
                },
                {
                  title: "Food Delivery Tracking",
                  desc: "Condition monitoring during last-mile transit.",
                  img: "https://images.unsplash.com/photo-1586864387917-f581490217ec?q=80&w=2670&auto=format&fit=crop",
                  y: "lg:translate-y-[200px]"
                },
                {
                  title: "Household Management",
                  desc: "Molecular intelligence for every home kitchen.",
                  img: "https://images.unsplash.com/photo-1556911220-e15224bbafb0?q=80&w=2670&auto=format&fit=crop",
                  y: "lg:translate-y-[10px]"
                },
                {
                  title: "Food Donation System",
                  desc: "Bridging the gap securely between surplus and need.",
                  img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2673&auto=format&fit=crop",
                  y: "lg:translate-y-[150px]"
                }
              ].map((s, i) => (
                <div key={i} className={`flex flex-col items-center group ${s.y} transition-all duration-700`}>
                  <div className="relative mb-8">
                    <div className="w-48 h-48 rounded-full border-[8px] border-white p-1 group-hover:scale-105 transition-transform duration-700 shadow-xl bg-white overflow-hidden">
                      <div className="w-full h-full rounded-full overflow-hidden relative isolate">
                        <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base z-20 shadow-xl border-4 border-white">
                      {i + 1}
                    </div>
                  </div>
                  <div className="text-center space-y-3 px-4">
                    <h3 className="text-xl font-semibold text-slate-900 uppercase tracking-tight leading-tight max-w-[180px] mx-auto group-hover:text-green-600 transition-colors">{s.title}</h3>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-[180px] mx-auto">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-white border-t border-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-bold text-green-600 uppercase tracking-[0.5em] mb-4">Common Questions</h2>
            <p className="text-4xl font-semibold text-slate-900 tracking-tighter">Everything You <span className="text-green-600 underline decoration-slate-200 underline-offset-8">Need</span> To Know.</p>
          </div>

          <div className="grid gap-4">
            {[
              {
                q: "What sensors does ALMA use?",
                a: "We deploy molecular sensing arrays that track volatile organic compounds (VOCs) and environmental factors like temperature and humidity."
              },
              {
                q: "How does the blockchain verify quality?",
                a: "Every sensor reading is hashed and written to a secure ledger, creating an immutable history of the produce's environment."
              },
              {
                q: "Is ALMA available for small-scale farmers?",
                a: "Yes. Our interaction model allows farmers to receive real-time alerts via any mobile device including USSD."
              }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-[24px] p-8 border border-transparent hover:border-green-100 hover:bg-white hover:shadow-xl transition-all group cursor-pointer text-left">
                <div className="flex justify-between items-center gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-tight group-hover:text-green-600 transition-colors">
                      {item.q}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

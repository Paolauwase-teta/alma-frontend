'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingCart, Leaf, Sprout, Tractor, Shovel, ChevronRight, Star, Shield, BarChart3, Home, Heart, Send, Mail, Phone, MapPin, Cpu, Database, Radio } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[var(--background)] min-h-screen font-[family-name:var(--font-jost)] relative overflow-hidden">
      {/* Massive Background Text - Global Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[35vw] font-black text-[var(--muted)] opacity-60 leading-none tracking-tighter uppercase">
          ALMA
        </span>
      </div>

      {/* Hero Section - Deeper Midnight Forest Green */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-6 pt-20 text-center bg-[#01110a]">
        <div className="absolute inset-0 bg-[#01110a] overflow-hidden">
          <img
            src="/hero.png"
            alt="Farm Hero"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-[#01110a]/60"></div>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-950/40 backdrop-blur-md text-green-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] border border-green-500/20 mb-10">
            ALMA TECHNOLOGY
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-8 uppercase italic-none">
            Our Premium <span className="text-green-500">Services.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed opacity-90 mb-12">
            Revolutionizing food security through molecular intelligence, blockchain transparency, and integrated logistics.
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="px-12 py-5 bg-[#0a4a34] text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.3em] shadow-xl shadow-green-900/20 hover:bg-[#0c5a3e] hover:scale-105 transition-all active:scale-95"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Premium Services - Zig-Zag Interconnected Design */}
      <section className="px-6 py-40 bg-[var(--background)] relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-4">
            <span className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.5em]">The ALMA Lifecycle</span>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase">End-to-End <br />Intelligence.</h2>
          </div>

          <div className="relative pb-24">
            {/* SVG Connecting Lines - Zig Zag Path */}
            <svg className="absolute top-0 left-0 w-full h-full hidden lg:block pointer-events-none opacity-40" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
              <path
                d="M150,150 L450,300 L750,150 L1050,300"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="animate-[dash_20s_linear_infinite]"
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-10">
              {[
                {
                  num: 1,
                  title: "Smart Storage Monitoring",
                  desc: "Precision sensors for molecular freshness tracking at origin farms.",
                  img: "/smart_storage.png",
                  offset: "lg:-translate-y-16"
                },
                {
                  num: 2,
                  title: "Food Delivery Tracking",
                  desc: "Real-time monitoring of perishable goods throughout the delivery chain for peak quality.",
                  img: "/smart_logistics.png",
                  offset: "lg:translate-y-16"
                },
                {
                  num: 3,
                  title: "Household Management",
                  desc: "Bringing molecular intelligence to every home kitchen for zero waste.",
                  img: "/smart_kitchen.png",
                  offset: "lg:-translate-y-16"
                },
                {
                  num: 4,
                  title: "Food Donation System",
                  desc: "Bridging the gap securely between surplus inventory and communities in need.",
                  img: "/food_donation.png",
                  offset: "lg:translate-y-16"
                }
              ].map((s, i) => (
                <div key={i} className={`flex flex-col items-center text-center space-y-8 group ${s.offset} transition-transform duration-700`}>
                  {/* Circle Hub - Clickable to Services */}
                  <div className="relative w-64 h-64">
                    <Link href="/services" className="block w-full h-full relative z-10 rounded-full">
                      <div className="absolute inset-0 rounded-full bg-[var(--card)] border-[12px] border-[var(--background)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden group-hover:scale-105 transition-transform duration-500 z-10">
                        <img
                          src={s.img}
                          alt={s.title}
                          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 to-transparent"></div>
                      </div>
                    </Link>

                    {/* Number Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#22c55e] border-4 border-[var(--background)] rounded-full flex items-center justify-center text-white font-black text-xl z-20 shadow-lg">
                      {s.num}
                    </div>
                  </div>

                  <div className="space-y-4 max-w-[240px]">
                    <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-tighter leading-tight italic-none">
                      {s.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-[10px] font-bold leading-relaxed uppercase tracking-[0.15em] opacity-80">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}</style>
      </section>

      {/* 3. The ALMA Ecosystem - Compact Title */}
      <section className="px-6 py-32 bg-[var(--background)] relative border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-5xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase italic-none">The ALMA Ecosystem</h2>
            <p className="text-sm font-black text-[#0a4a34] uppercase tracking-[0.4em]">Zero Waste from Farm to Fork</p>
            <div className="w-20 h-1 bg-[#0a4a34] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                <div className="absolute top-0 right-0 w-14 h-14 border-t-[5px] border-r-[5px] border-[var(--border)] rounded-tr-[50px] z-10 group-hover:border-[#0a4a34] transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-14 h-14 border-b-[5px] border-l-[5px] border-[var(--border)] rounded-bl-[50px] z-10 group-hover:border-[#0a4a34] transition-colors"></div>

                <div className="bg-[var(--card)] p-12 rounded-[50px] border border-[var(--border)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_35px_80px_-15px_rgba(34,197,94,0.12)] transition-all duration-500 flex flex-col items-start relative z-0 h-full text-left">
                  <div className="w-16 h-16 bg-[var(--foreground)] text-green-500 rounded-2xl flex items-center justify-center mb-10 shadow-md group-hover:scale-110 transition-transform">
                    <p.icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--foreground)] mb-5 uppercase tracking-tighter italic-none">{p.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-base font-medium leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="px-6 py-32 bg-[var(--background)] relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.5em] mb-4">Common Questions</h2>
            <p className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter uppercase italic-none">Everything You <span className="text-[#0a4a34]">Need</span> To Know.</p>
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
              <div key={i} className="bg-[var(--card)] rounded-[32px] p-10 border border-[var(--border)] hover:border-green-100 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all group cursor-pointer text-left">
                <div className="flex justify-between items-center gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-[var(--foreground)] uppercase tracking-tighter group-hover:text-[#0a4a34] transition-colors italic-none">
                      {item.q}
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-base font-medium leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[#0a4a34] group-hover:text-[#0a4a34] transition-all">
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section className="py-32 px-6 bg-[var(--background)] border-t border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="w-full lg:w-1/2 space-y-10 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-[#0a4a34] rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] border border-green-100">
                GET IN TOUCH
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--foreground)] leading-[1] tracking-tighter uppercase italic-none">
                Ready to <span className="text-[#0a4a34]">Upgrade</span> <br />
                Your Supply Chain?
              </h2>
              <p className="text-xl text-[var(--muted-foreground)] font-medium max-w-md leading-relaxed">
                Send us a message today and discover how molecular intelligence can transform your agricultural efficiency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--card)] rounded-2xl flex items-center justify-center text-[#0a4a34] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-[var(--border)]">
                    <Mail size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Email Us</span>
                    <span className="text-base font-black text-[var(--foreground)] uppercase tracking-tight">hello@alma.agri</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--card)] rounded-2xl flex items-center justify-center text-[#0a4a34] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-[var(--border)]">
                    <Phone size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">Call Us</span>
                    <span className="text-base font-black text-[var(--foreground)] uppercase tracking-tight">+250 788 000 000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="bg-[var(--card)] p-10 md:p-16 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(10,74,52,0.1)] border border-[var(--border)]">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.3em] ml-2">Full Name</label>
                      <input type="text" placeholder="JOHN DOE" className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-8 py-5 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-[#0a4a34] focus:ring-1 focus:ring-[#0a4a34] transition-all font-black text-sm uppercase tracking-tight" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.3em] ml-2">Email</label>
                      <input type="email" placeholder="JOHN@EXAMPLE.COM" className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-8 py-5 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-[#0a4a34] focus:ring-1 focus:ring-[#0a4a34] transition-all font-black text-sm uppercase tracking-tight" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#0a4a34] uppercase tracking-[0.3em] ml-2">Message</label>
                    <textarea rows={4} placeholder="YOUR INQUIRY..." className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-2xl px-8 py-5 text-[var(--foreground)] placeholder:text-slate-400 focus:outline-none focus:border-[#0a4a34] focus:ring-1 focus:ring-[#0a4a34] transition-all font-black text-sm uppercase tracking-tight resize-none shadow-sm"></textarea>
                  </div>
                  <button className="w-full bg-[#0a4a34] hover:bg-[#0c5a3e] text-white rounded-2xl py-6 font-black text-[14px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 group shadow-xl shadow-green-900/20">
                    SEND MESSAGE <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

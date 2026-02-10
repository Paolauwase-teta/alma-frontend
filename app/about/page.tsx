import { Leaf, Globe, Target, Users, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 space-y-20">
            <header className="text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                    <Leaf size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Protecting the Planet</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    ALMA is on a mission to reshape how we manage food resources using cutting-edge science and technology.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <Globe size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">SDG 2: Zero Hunger</h3>
                    <p className="text-slate-600 leading-relaxed">
                        By reducing food waste at the storage and transportation stages, we ensure that more food reaches those who need it, contributing to global food security.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Target size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">SDG 12: Responsible Consumption</h3>
                    <p className="text-slate-600 leading-relaxed">
                        ALMA provides the transparency and tools needed for warehouses, retailers, and households to manage their consumption patterns responsibly.
                    </p>
                </div>
            </section>

            <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden text-center md:text-left">
                <div className="relative z-10 md:flex md:items-center md:gap-12">
                    <div className="space-y-6 md:flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold">The Science of Spoilage</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Traditional systems rely on visible signs of decay. ALMA's sensors detect Volatile Organic Compounds (VOCs) and Ethylene gas—the chemical precursors to spoilage—at concentrations as low as 10 parts per billion.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={20} className="text-emerald-400" />
                                <span className="font-bold text-sm">94% Accuracy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={20} className="text-emerald-400" />
                                <span className="font-bold text-sm">Real-time alerts</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 md:mt-0 flex-shrink-0">
                        <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                            <Users size={64} className="text-white/40" />
                        </div>
                    </div>
                </div>

                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
}

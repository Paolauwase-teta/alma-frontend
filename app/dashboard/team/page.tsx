'use client';

import { Users, Mail, Phone, Plus, MoreHorizontal, Shield, ExternalLink, Store } from 'lucide-react';
import { useState } from 'react';
import Toast, { ToastType } from '@/app/components/Toast';

const internalTeam = [
    { id: 1, name: 'Alice Johnson', role: 'Operations Manager', email: 'alice@alma.com', phone: '+250 788 000 001', image: '/alice.png', level: 'Admin' },
    { id: 2, name: 'Bob Smith', role: 'Warehouse Lead', email: 'bob@alma.com', phone: '+250 788 000 002', image: '/bob.png', level: 'Editor' },
    { id: 3, name: 'Charlie Brown', role: 'Data Analyst', email: 'charlie@alma.com', phone: '+250 788 000 003', image: '/charlie.png', level: 'Viewer' },
];

const partnerContacts = [
    { id: 4, name: 'Jean Pierre', role: 'Simba Procurement', email: 'jp.procure@simba.com', phone: '+250 788 111 222', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop', company: 'Simba SuperMarket' },
    { id: 5, name: 'Marie Mutoni', role: 'Simba Quality Control', email: 'm.mutoni@simba.com', phone: '+250 788 333 444', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop', company: 'Simba SuperMarket' },
];

export default function TeamPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [activeSection, setActiveSection] = useState<'internal' | 'partners'>('internal');

    const handleInvite = () => {
        setToast({ message: "Invitation protocol initiated. Checking permissions...", type: 'info' });
        setTimeout(() => {
            setToast({ message: "Invite sent successfully!", type: 'success' });
        }, 1500);
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-[var(--primary)]">Collaboration Hub</h2>
                    <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-[10px]">Manage your core team and external retail partners</p>
                </div>
                <button
                    onClick={handleInvite}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--primary-light)] text-white rounded-2xl font-black shadow-lg shadow-[var(--primary-light)]/20 hover:scale-105 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Add Personnel
                </button>
            </div>

            {/* Section Switcher */}
            <div className="flex gap-4 p-1.5 bg-gray-100/50 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveSection('internal')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeSection === 'internal' ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]'}`}
                >
                    <Users size={18} />
                    Internal Team
                </button>
                <button
                    onClick={() => setActiveSection('partners')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeSection === 'partners' ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]'}`}
                >
                    <Store size={18} />
                    Retail Partners
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(activeSection === 'internal' ? internalTeam : partnerContacts).map((member: any) => (
                    <div key={member.id} className="relative bg-[var(--card)] rounded-[32px] p-8 border border-[var(--border)] shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                        {/* Status Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--muted)] -mr-16 -mt-16 rounded-full group-hover:bg-[var(--primary-light)]/5 transition-colors duration-500" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="relative">
                                    <img src={member.image} alt={member.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[var(--card)] shadow-xl" />
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--card)] flex items-center justify-center ${activeSection === 'internal' ? 'bg-blue-500' : 'bg-[var(--accent)]'}`}>
                                        {activeSection === 'internal' ? <Shield size={10} className="text-white" /> : <Store size={10} className="text-white" />}
                                    </div>
                                </div>
                                <button className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)] rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <div className="space-y-1 mb-6">
                                <h3 className="text-xl font-black text-[var(--primary)]">{member.name}</h3>
                                <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{member.role}</p>
                                {member.company && (
                                    <div className="flex items-center gap-1 text-[var(--accent)] font-black text-[10px] mt-1 uppercase tracking-wider">
                                        <Store size={10} /> {member.company}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-[var(--border)]">
                                <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group/link">
                                    <div className="w-9 h-9 bg-[var(--muted)] rounded-xl flex items-center justify-center group-hover/link:bg-[var(--primary-light)]/10 transition-colors">
                                        <Mail size={16} className="text-[var(--muted-foreground)] group-hover/link:text-[var(--primary-light)]" />
                                    </div>
                                    {member.email}
                                </a>
                                <div className="flex items-center gap-3 text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group/link cursor-pointer">
                                    <div className="w-9 h-9 bg-[var(--muted)] rounded-xl flex items-center justify-center group-hover/link:bg-[var(--primary-light)]/10 transition-colors">
                                        <Phone size={16} className="text-[var(--muted-foreground)] group-hover/link:text-[var(--primary-light)]" />
                                    </div>
                                    {member.phone}
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}

                {/* Addition Card */}
                <div
                    onClick={handleInvite}
                    className="bg-[var(--muted)] border-2 border-dashed border-[var(--border)] rounded-[32px] p-8 flex flex-col items-center justify-center text-center group hover:bg-[var(--card)] hover:border-[var(--primary-light)] transition-all cursor-pointer h-full min-h-[300px]"
                >
                    <div className="w-16 h-16 bg-[var(--card)] rounded-2xl flex items-center justify-center text-[var(--muted-foreground)] mb-4 group-hover:bg-[var(--primary-light)] group-hover:text-white transition-all shadow-sm group-hover:shadow-lg">
                        <Plus size={32} />
                    </div>
                    <h5 className="font-black text-[var(--primary)] text-lg">Add {activeSection === 'internal' ? 'Team Member' : 'Partner Agent'}</h5>
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest mt-2 max-w-[200px]">Send a secure invitation</p>
                </div>
            </div>
        </div>
    );
}

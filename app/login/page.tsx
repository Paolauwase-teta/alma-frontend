'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Leaf, Eye, EyeOff } from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Store user session (in production, use proper auth)
            localStorage.setItem('alma_user', JSON.stringify({
                email: formData.email,
                name: formData.email.split('@')[0],
                role: 'admin'
            }));

            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#e8f0ec] flex items-center justify-center p-6">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Branding */}
                <div className="hidden lg:block space-y-8 animate-fade-in">
                    <Link href="/" className="flex items-center gap-3 group">
                        <AlmaLogo className="w-16 h-16" />
                        <span className="text-4xl font-black text-[#1a3a2e] tracking-tight">ALMA</span>
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-black text-[#1a3a2e] leading-tight">
                            Welcome back to<br />
                            <span className="text-[#4a7c59]">Food Intelligence</span>
                        </h1>
                        <p className="text-lg text-[#1a3a2e]/60 leading-relaxed max-w-md">
                            Monitor your entire supply chain with molecular-level precision. Reduce waste, increase profits, and contribute to global sustainability.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8">
                        <div className="space-y-2">
                            <p className="text-4xl font-black text-[#4a7c59]">94%</p>
                            <p className="text-sm text-[#1a3a2e]/50 font-semibold">AI Prediction</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl font-black text-[#4a7c59]">100%</p>
                            <p className="text-sm text-[#1a3a2e]/50 font-semibold">Verified Log</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl font-black text-[#4a7c59]">$1.2T</p>
                            <p className="text-sm text-[#1a3a2e]/50 font-semibold">Market Impact</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-white rounded-[48px] p-12 shadow-2xl border border-[#1a3a2e]/5 animate-scale-in">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-[#1a3a2e] mb-2">Sign in to ALMA</h2>
                        <p className="text-[#1a3a2e]/60">Enter your credentials to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full pl-14 pr-5 py-4 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-14 py-4 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 hover:text-[#1a3a2e] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-2 border-[#1a3a2e]/20 text-[#4a7c59] focus:ring-[#4a7c59]" />
                                <span className="text-sm text-[#1a3a2e]/60 font-semibold">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-[#4a7c59] font-bold hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#4a7c59] text-white rounded-3xl font-bold text-base hover:bg-[#3d6849] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#1a3a2e]/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-[#1a3a2e]/40 font-semibold">OR</span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-[#1a3a2e]/60">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-[#4a7c59] font-bold hover:underline">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Chatbot from '@/app/components/Chatbot';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isLogin = pathname?.startsWith('/login');
    const isSignup = pathname?.startsWith('/signup');
    const shouldHideNavFooter = isDashboard || isLogin || isSignup;

    return (
        <div className="flex flex-col min-h-screen">
            {!shouldHideNavFooter && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!shouldHideNavFooter && <Footer />}
            <Chatbot />
        </div>
    );
}

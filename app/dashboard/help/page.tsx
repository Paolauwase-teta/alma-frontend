'use client';

import { useState } from 'react';
import { Search, Book, MessageCircle, Mail, Phone, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import Toast, { ToastType } from '@/app/components/Toast';

export default function HelpPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: "How do I add a new storage location?",
            answer: "Navigate to the Inventory page and click the 'Add Item' button in the top right. Fill in the required information including location name, type, and initial sensor readings."
        },
        {
            question: "What do the different alert severities mean?",
            answer: "Critical alerts require immediate attention (e.g., spoilage detected). Warning alerts indicate potential issues that should be monitored. Info alerts are general notifications about system status."
        },
        {
            question: "How accurate is the spoilage prediction?",
            answer: "Our AI model achieves 94% accuracy in predicting spoilage 72 hours in advance. The system uses molecular-level sensors combined with machine learning to detect early signs of degradation."
        },
        {
            question: "Can I export my data?",
            answer: "Yes! Go to the Analytics page and click the 'Export Report' button. You can export data in CSV, Excel, or PDF formats for any custom date range."
        },
        {
            question: "How do I invite team members?",
            answer: "Visit the Team page and click 'Invite Member'. Enter their email address and select their role. They'll receive an invitation email with setup instructions."
        },
        {
            question: "What happens when a sensor goes offline?",
            answer: "You'll receive an immediate alert. The system will continue to display the last known readings and estimate conditions based on historical patterns until the sensor reconnects."
        },
        {
            question: "How do I change my notification preferences?",
            answer: "Go to Settings > Notifications. You can customize email and push notifications, set alert thresholds, and configure which events trigger notifications."
        },
        {
            question: "Is my data encrypted?",
            answer: "Yes, all data is encrypted both in transit (TLS 1.3) and at rest (AES-256). We also use blockchain verification for supply chain data to ensure tamper-proof records."
        }
    ];

    const resources = [
        {
            title: "Getting Started Guide",
            description: "Learn the basics of ALMA and set up your first storage location",
            icon: Book,
            link: "#"
        },
        {
            title: "API Documentation",
            description: "Integrate ALMA with your existing systems",
            icon: ExternalLink,
            link: "#"
        },
        {
            title: "Video Tutorials",
            description: "Watch step-by-step guides for common tasks",
            icon: ExternalLink,
            link: "#"
        },
        {
            title: "Best Practices",
            description: "Optimize your food preservation workflow",
            icon: Book,
            link: "#"
        }
    ];

    const handleContactSubmit = (method: string) => {
        setToast({ message: `Opening ${method} support...`, type: 'info' });
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-5xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div>
                <h2 className="text-2xl font-bold text-gray-900">Help Center</h2>
                <p className="text-gray-500 text-sm">Find answers and get support</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">How can we help you?</h3>
                    <p className="text-gray-500">Search our knowledge base or browse topics below</p>
                </div>
                <div className="relative max-w-2xl mx-auto">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for help articles..."
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all"
                    />
                </div>
            </div>

            {/* Quick Resources */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {resources.map((resource, index) => (
                        <button
                            key={index}
                            onClick={() => setToast({ message: `Opening ${resource.title}...`, type: 'info' })}
                            className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all text-left group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#e8f0ec] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#4a7c59] transition-colors">
                                    <resource.icon size={24} className="text-[#4a7c59] group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-[#4a7c59] transition-colors">{resource.title}</h4>
                                    <p className="text-sm text-gray-500">{resource.description}</p>
                                </div>
                                <ExternalLink size={18} className="text-gray-400 group-hover:text-[#4a7c59] transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQs */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                    {expandedFaq === index ? (
                                        <ChevronUp size={20} className="text-gray-400 shrink-0" />
                                    ) : (
                                        <ChevronDown size={20} className="text-gray-400 shrink-0" />
                                    )}
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-6 pb-4 text-gray-600 animate-slide-up">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                            <p className="text-gray-500">No results found for "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-3 text-[#4a7c59] font-medium hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-[#4a7c59] to-[#3d6849] rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                    <p className="text-white/80">Our support team is here to assist you</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <button
                        onClick={() => handleContactSubmit('Live Chat')}
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 transition-all text-center border border-white/20"
                    >
                        <MessageCircle size={32} className="mx-auto mb-3" />
                        <p className="font-bold mb-1">Live Chat</p>
                        <p className="text-sm text-white/80">Average response: 2 min</p>
                    </button>
                    <button
                        onClick={() => handleContactSubmit('Email')}
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 transition-all text-center border border-white/20"
                    >
                        <Mail size={32} className="mx-auto mb-3" />
                        <p className="font-bold mb-1">Email Support</p>
                        <p className="text-sm text-white/80">support@alma.com</p>
                    </button>
                    <button
                        onClick={() => handleContactSubmit('Phone')}
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 transition-all text-center border border-white/20"
                    >
                        <Phone size={32} className="mx-auto mb-3" />
                        <p className="font-bold mb-1">Phone Support</p>
                        <p className="text-sm text-white/80">+250 788 123 456</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

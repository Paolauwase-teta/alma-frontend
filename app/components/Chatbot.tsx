'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm ALMA AI. How can I help you optimize your supply chain today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        const query = inputText.toLowerCase();
        setInputText('');
        setIsTyping(true);

        // Simulate AI response with matching logic
        setTimeout(() => {
            let response = "";

            if (query.includes("what is alma")) {
                response = "ALMA is a deep-tech agricultural ecosystem that uses molecular sensing and AI to eliminate food waste. We provide a 'digital nose' for the supply chain, combined with blockchain for immutable transparency.";
            } else if (query.includes("problem") || query.includes("solve")) {
                response = "We solve the 'invisible spoilage' problem—where food looks fine but is degrading chemically. We also tackle the massive logistics inefficiency that causes 1.3B tons of food to be wasted annually while millions go hungry.";
            } else if (query.includes("feature")) {
                response = "Key features include: 1. VOC Sensing (detecting spoilage days early), 2. AI Predictive Analytics (forecasting shelf-life with 94.2% accuracy), 3. Blockchain Audit Trails, and 4. Automated Redistribution for surplus food.";
            } else if (query.includes("service")) {
                response = "Our services cover the whole chain: 'Molecular Sensing' for warehouses, 'Predictive Logistics' for transporters, 'Blockchain Ledgers' for retailers, and 'Redistribution Engines' for NGOs and community kitchens.";
            } else if (query.includes("post storage") || query.includes("prevention") || query.includes("how does it prevent")) {
                response = "ALMA prevents post-storage loss by detecting Ethylene and Volatile Organic Compounds (VOCs) at 10ppb (parts per billion). By 'smelling' the start of decay before humans can see it, we trigger immediate re-routing or sales before the food actually spoils.";
            } else if (query.includes("better") || query.includes("traditional")) {
                response = "Traditional methods are reactive—you wait for food to look or smell bad, then throw it away. ALMA is proactive. We use real-time chemical data to move food while it's still fresh, ensuring 30%+ less waste than standard cold storage systems.";
            } else {
                const genericResponses = [
                    "That's a great question. Our blockchain-verified data ensures 100% transparency in the supply chain.",
                    "Based on global metrics, ALMA's predictive models typically reduce spoilage by up to 30%.",
                    "I can certainly help with that. Our molecular sensors provide real-time data to prevent food waste.",
                    "Excellent point. ALMA leverages advanced AI to predict freshness windows with 94% accuracy.",
                    "Would you like to see a demo of our analytics dashboard? It connects all your logistical nodes in one view."
                ];
                response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
            }

            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen
                    ? 'bg-red-500 rotate-90'
                    : 'bg-[#4a7c59] animate-bounce'
                    }`}
            >
                {isOpen ? (
                    <X size={28} className="text-white" />
                ) : (
                    <MessageSquare size={28} className="text-white" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-[var(--card)] rounded-3xl shadow-2xl border border-[var(--border)] flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#1a3a2e] to-[#4a7c59] p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Bot size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">ALMA Assistant</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-xs text-white/80">Online • AI Powered</span>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--muted)]">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-[#1a3a2e]' : 'bg-[#4a7c59]'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={12} className="text-white" /> : <Sparkles size={12} className="text-white" />}
                                    </div>
                                    <div
                                        className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-[#1a3a2e] text-white rounded-br-none'
                                            : 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-end gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#4a7c59] flex items-center justify-center shrink-0">
                                        <Sparkles size={12} className="text-white" />
                                    </div>
                                    <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-2xl rounded-bl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-[var(--card)] border-t border-[var(--border)]">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Ask about our technology..."
                                className="w-full pl-4 pr-12 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[#4a7c59] focus:bg-[var(--card)] transition-all text-[var(--foreground)] text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#1a3a2e] text-white rounded-lg hover:bg-[#4a7c59] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-[var(--muted-foreground)]">
                                Powered by Blockchain & Advanced AI
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

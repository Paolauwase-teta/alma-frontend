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
        setInputText('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponses = [
                "That's a great question about supply chain optimization. Our blockchain-verified data ensures 100% transparency.",
                "Based on your query, ALMA's predictive models suggest a 30% reduction in spoilage for that category.",
                "I can certainly help with that. Our molecular sensors provide real-time data to prevent food waste.",
                "Excellent point. ALMA leverages advanced AI to predict freshness windows with 94% accuracy.",
                "Would you like to see a demo of our dashboard? It connects all your logistical nodes in one view."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1500);
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
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-[#1a3a2e]/10 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
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
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
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
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
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
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
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
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Ask about our technology..."
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all text-sm"
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
                            <p className="text-[10px] text-gray-400">
                                Powered by Blockchain & Advanced AI
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

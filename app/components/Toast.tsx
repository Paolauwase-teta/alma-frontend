'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                    type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                        'bg-white border-gray-200 text-gray-800'
                }`}>
                {type === 'success' && <CheckCircle2 size={18} className="text-green-600" />}
                {type === 'error' && <XCircle size={18} className="text-red-600" />}
                <p className="text-sm font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-2 p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                    <X size={14} className="opacity-50" />
                </button>
            </div>
        </div>
    );
}

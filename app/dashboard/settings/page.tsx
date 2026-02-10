'use client';

import { useState } from 'react';
import { User, Bell, Lock, Globe, Palette, Database, Shield, Mail, Save, CheckCircle2 } from 'lucide-react';
import Toast, { ToastType } from '@/app/components/Toast';

export default function SettingsPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [settings, setSettings] = useState({
        // Profile
        name: 'Niyobyose ISAAC',
        email: 'niyobyose.isaac@alma.com',
        company: 'ALMA Systems',
        role: 'Administrator',

        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        alertThreshold: 'medium',

        // Security
        twoFactorAuth: false,
        sessionTimeout: '30',

        // Preferences
        language: 'en',
        timezone: 'Africa/Kigali',
        theme: 'light',

        // Data
        dataRetention: '90',
        autoBackup: true,
    });

    const handleSave = (section: string) => {
        setToast({ message: `${section} settings saved successfully!`, type: 'success' });
    };

    const handleChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 max-w-5xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-500 text-sm">Manage your account and application preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                            <p className="text-sm text-gray-500">Update your personal details</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={settings.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                            <input
                                type="text"
                                value={settings.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                            <input
                                type="text"
                                value={settings.role}
                                disabled
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={() => handleSave('Profile')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                            <Bell size={20} className="text-orange-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500">Configure how you receive alerts</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-semibold text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive alerts via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4a7c59]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a7c59]"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-semibold text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive browser notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.pushNotifications}
                                onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4a7c59]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a7c59]"></div>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Alert Threshold</label>
                        <select
                            value={settings.alertThreshold}
                            onChange={(e) => handleChange('alertThreshold', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                        >
                            <option value="low">Low - All alerts</option>
                            <option value="medium">Medium - Important alerts only</option>
                            <option value="high">High - Critical alerts only</option>
                        </select>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={() => handleSave('Notification')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                            <Shield size={20} className="text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Security</h3>
                            <p className="text-sm text-gray-500">Manage security preferences</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.twoFactorAuth}
                                onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4a7c59]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a7c59]"></div>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={() => handleSave('Security')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                            <Globe size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Preferences</h3>
                            <p className="text-sm text-gray-500">Customize your experience</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleChange('language', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                            >
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="rw">Kinyarwanda</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleChange('timezone', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4a7c59] focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                            >
                                <option value="Africa/Kigali">Africa/Kigali (CAT)</option>
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">America/New York (EST)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={() => handleSave('Preferences')}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

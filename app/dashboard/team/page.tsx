'use client';

import { Users, Mail, Phone, Plus } from 'lucide-react';

const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Operations Manager', email: 'alice@alma.com', phone: '+1234567890', image: 'https://i.pravatar.cc/150?u=alice' },
    { id: 2, name: 'Bob Smith', role: 'Warehouse Lead', email: 'bob@alma.com', phone: '+1987654321', image: 'https://i.pravatar.cc/150?u=bob' },
    { id: 3, name: 'Charlie Brown', role: 'Data Analyst', email: 'charlie@alma.com', phone: '+1122334455', image: 'https://i.pravatar.cc/150?u=charlie' },
];

export default function TeamPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                    <p className="text-gray-500 text-sm">Manage users and access permissions</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm">
                    <Plus size={20} />
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail size={16} className="text-gray-400" />
                                {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={16} className="text-gray-400" />
                                {member.phone}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

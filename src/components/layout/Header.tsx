'use client';

import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, Agent</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

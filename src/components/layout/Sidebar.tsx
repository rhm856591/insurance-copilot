'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, MessageSquare, Users, UserCheck, Shield, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Customers', href: '/customers', icon: UserCheck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Admin', href: '/admin', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-gray-900">
        <Link href="/home" className="flex items-center h-16 px-4 bg-gray-800 hover:bg-gray-700 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-white">AI</span>
          </div>
          <h1 className="text-lg font-bold text-white">Insurance AI</h1>
        </Link>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-400">Logged in as Agent</p>
          <Link href="/login" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}

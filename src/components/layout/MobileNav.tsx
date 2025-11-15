'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, MessageSquare, Users, UserCheck, Shield, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  // { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Customers', href: '/customers', icon: UserCheck },
  // { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'Alerts', href: '/notifications', icon: Bell },
  // { name: 'Admin', href: '/admin', icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center h-16 overflow-x-auto hide-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-2 text-xs min-w-[60px] min-h-[44px] active:scale-95 transition-all',
                isActive ? 'text-blue-600' : 'text-gray-600'
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn('mt-1 text-[9px] whitespace-nowrap', isActive && 'font-semibold')}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/';
  // const isHomePage = pathname === '/home';

  if (isAuthPage) {
    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body className="touch-manipulation">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="touch-manipulation">
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white border-b border-gray-200 h-14 md:h-16 flex items-center justify-between px-4 md:px-6">
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Welcome, Agent</h2>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
              {children}
            </main>
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md md:max-w-lg',
    lg: 'max-w-lg md:max-w-2xl',
    xl: 'max-w-xl md:max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end md:items-center justify-center p-0 md:p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className={cn(
          'relative bg-white w-full rounded-t-2xl md:rounded-lg shadow-xl animate-slideUp',
          'max-h-[90vh] md:max-h-[85vh] overflow-y-auto',
          sizes[size]
        )}>
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 md:p-6 border-b">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-transform"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

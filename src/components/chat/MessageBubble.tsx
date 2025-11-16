import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import MessageActions from './MessageActions';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAgent = message.role === 'agent' || message.role === 'user';

  return (
    <div className={cn('flex gap-3 mb-4', isAgent ? 'justify-end' : 'justify-start')}>
      {!isAgent && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
      )}
      <div className={cn('max-w-[70%]', isAgent ? '' : 'w-full')}>
        <div className={cn(
          'rounded-lg px-4 py-2',
          isAgent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        )}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <span className={cn('text-xs mt-1 block', isAgent ? 'text-blue-100' : 'text-gray-500')}>
            {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {!isAgent && message.metadata && (
          <MessageActions
            whatsapp={message.metadata.whatsapp}
            email={message.metadata.email}
            voice_text={message.metadata.voice_text}
          />
        )}
      </div>
      {isAgent && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
      )}
    </div>
  );
}

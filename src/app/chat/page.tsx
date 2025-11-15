'use client';

import { useState } from 'react';
import { Edit3 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ChatInterface from '@/components/chat/ChatInterface';
import DraftEditor from '@/components/chat/DraftEditor';

export default function ChatPage() {
  const [showDraftEditor, setShowDraftEditor] = useState(false);

  return (
    <div className="h-full animate-fadeIn flex flex-col">
      <div className="mb-3 md:mb-6 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">
            AI Chat Assistant
          </h1>
          <p className="text-xs md:text-base text-gray-600 mt-1">Real-time assistance</p>
        </div>
        
        {/* Mobile Draft Editor Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDraftEditor(!showDraftEditor)}
          className="lg:hidden"
        >
          <Edit3 size={16} className="mr-2" />
          Draft
        </Button>
      </div>

      {/* Mobile: Show either chat or draft editor, Desktop: Side by side */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-3 md:gap-6 overflow-hidden">
        {/* Chat Interface */}
        <div className={`flex-1 lg:col-span-2 overflow-hidden ${showDraftEditor ? 'hidden lg:block' : ''}`}>
          <Card className="h-full">
            <ChatInterface />
          </Card>
        </div>
        
        {/* Draft Editor */}
        <div className={`flex-1 lg:col-span-1 overflow-hidden ${showDraftEditor ? 'block' : 'hidden lg:block'}`}>
          <DraftEditor />
        </div>
      </div>
    </div>
  );
}

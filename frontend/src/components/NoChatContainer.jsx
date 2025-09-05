import React from 'react'
import { MessageSquare } from "lucide-react";

const NoChatContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
      {/* Icon */}
      <div className='flex justify-center gap-4 mb-4'>
        <div className='relative'>
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 shadow-lg animate-bounce">
            <MessageSquare className="size-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-2xl font-semibold text-foreground">
        No Conversation Selected
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Pick a chat from the sidebar or start a new one to begin messaging.
      </p>

      {/* CTA Button */}
      <button className="mt-6 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-medium shadow-md hover:bg-primary/90 transition">
        Start a New Chat
      </button>
    </div>
  );
}

export default NoChatContainer;

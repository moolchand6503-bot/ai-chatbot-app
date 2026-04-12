import type { Message } from "@/hooks/useChat";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or typing state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth"
      aria-label="Chat messages"
      aria-live="polite"
      aria-atomic="false"
      data-ocid="chat-window"
    >
      {messages.length === 0 && (
        <div
          className="flex flex-col items-center justify-center h-full gap-4 text-center py-16"
          data-ocid="empty-state"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-2xl font-display font-bold text-primary">
              A
            </span>
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-lg">
              Start a conversation
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Send a message to begin chatting with Aether AI
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} className="h-px" aria-hidden="true" />
    </div>
  );
}

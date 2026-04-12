import type { Message } from "@/hooks/useChat";

interface MessageBubbleProps {
  message: Message;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div
        className="flex items-end justify-end gap-2 message-fade-in"
        data-ocid="user-message"
      >
        <div className="flex flex-col items-end gap-1 max-w-[75%] sm:max-w-[65%]">
          <div className="bg-accent text-accent-foreground rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed break-words font-body">
              {message.content}
            </p>
          </div>
          <span className="text-xs text-muted-foreground px-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
        {/* User avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/30 border border-accent/40 flex items-center justify-center">
          <span className="text-xs font-display font-semibold text-accent-foreground/80">
            U
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-end gap-2 message-fade-in"
      data-ocid="assistant-message"
    >
      {/* AI avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
        <span className="text-xs font-display font-semibold text-primary">
          A
        </span>
      </div>
      <div className="flex flex-col gap-1 max-w-[75%] sm:max-w-[65%]">
        <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed break-words font-body text-card-foreground">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-muted-foreground px-1">
          Aether AI · {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !disabled;

  function handleSend() {
    if (!canSend) return;
    onSend(value);
    setValue("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="flex items-end gap-3 px-4 py-4 bg-card border-t border-border"
      data-ocid="message-input-zone"
    >
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
          disabled={disabled}
          rows={1}
          className="resize-none min-h-[44px] max-h-36 overflow-y-auto pr-2 rounded-2xl bg-background border-border focus-visible:ring-primary/50 font-body text-sm placeholder:text-muted-foreground/60 transition-smooth disabled:opacity-50"
          aria-label="Message input"
          data-ocid="message-input"
          style={
            {
              height: "auto",
              fieldSizing: "content",
            } as React.CSSProperties
          }
        />
      </div>
      <Button
        onClick={handleSend}
        disabled={!canSend}
        size="icon"
        className="flex-shrink-0 h-11 w-11 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        aria-label="Send message"
        data-ocid="send-button"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}

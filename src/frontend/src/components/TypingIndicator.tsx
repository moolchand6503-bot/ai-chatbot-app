export function TypingIndicator() {
  return (
    <div
      className="flex items-end gap-2 message-fade-in"
      aria-label="Aether AI is typing"
      aria-live="polite"
      data-ocid="typing-indicator"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
        <span className="text-xs font-display font-semibold text-primary">
          A
        </span>
      </div>

      {/* Bubble */}
      <div className="flex flex-col gap-1 max-w-[70%]">
        <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="flex items-center gap-1.5 h-5">
            <span
              className="w-2 h-2 rounded-full bg-primary/70 typing-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary/70 typing-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary/70 typing-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground px-1">
          Aether AI is typing…
        </span>
      </div>
    </div>
  );
}

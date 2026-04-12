import { ChatWindow } from "@/components/ChatWindow";
import { MessageInput } from "@/components/MessageInput";
import { useChat } from "@/hooks/useChat";
import { Bot, Sparkles } from "lucide-react";

export default function App() {
  const { messages, sendMessage, isTyping, isDisabled } = useChat();

  return (
    <div className="dark min-h-screen bg-background flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Chat container */}
      <div
        className="w-full h-screen sm:h-[calc(100vh-2rem)] sm:max-h-[760px] sm:max-w-2xl flex flex-col overflow-hidden sm:rounded-3xl shadow-2xl border border-border bg-background"
        data-ocid="chat-container"
      >
        {/* Header */}
        <header className="flex items-center gap-3 px-5 py-4 bg-card border-b border-border flex-shrink-0">
          {/* Logo mark */}
          <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-primary" />
          </div>

          {/* Title + status */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-semibold text-foreground text-base leading-tight truncate">
              Aether AI
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${
                  isTyping ? "bg-accent typing-pulse" : "bg-chart-3"
                }`}
                aria-hidden="true"
              />
              <span className="text-xs text-muted-foreground font-body truncate">
                {isTyping ? "Typing…" : "Online · Ready to chat"}
              </span>
            </div>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-display font-medium text-primary">
              AI
            </span>
          </div>
        </header>

        {/* Messages */}
        <ChatWindow messages={messages} isTyping={isTyping} />

        {/* Input */}
        <MessageInput onSend={sendMessage} disabled={isDisabled} />

        {/* Footer branding */}
        <div className="flex items-center justify-center py-2 bg-card border-t border-border flex-shrink-0">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

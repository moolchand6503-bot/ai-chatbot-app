import { useCallback, useRef, useState } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

type ChatStatus = "idle" | "sending" | "typing";

const WELCOME_MESSAGE: Message = {
  id: "welcome-0",
  role: "assistant",
  content:
    "Hello! I'm Aether AI, your intelligent assistant. I can help you with analysis, creative writing, answering questions, drafting documents, brainstorming ideas, and much more. What's on your mind today?",
  timestamp: Date.now(),
};

const AI_RESPONSES: string[] = [
  "That's a great question! Let me think through this carefully. Based on what you've shared, I'd suggest approaching this step by step — starting with a clear goal definition, then breaking it into actionable milestones. Would you like me to help outline a specific plan?",
  "Absolutely, I can help with that! Here's what I'd recommend: first, consider the core objective you're trying to achieve. Then we can explore the most effective strategies tailored to your specific context. What details can you share to help me give you a more precise answer?",
  "Interesting! This is a topic I find fascinating. There are several perspectives worth considering here. The key factors to keep in mind are clarity of purpose, consistency of execution, and openness to iteration. Shall we dive deeper into any of these aspects?",
  "Great point! I think the most effective approach would be to start small and build momentum. Incremental progress compounds over time, and having clear checkpoints helps you stay on track. What's your timeline for this?",
  "I understand what you're looking for. Here's a thoughtful take: the solution often lies at the intersection of what's feasible, what's desirable, and what's sustainable long-term. Let me help you map out the best path forward based on your specific situation.",
  "That's something I can definitely help with! The first step is usually to clarify the core problem you're solving. Once we have that clear, we can brainstorm solutions, evaluate trade-offs, and develop an action plan. Where would you like to start?",
  "Excellent question! This touches on some nuanced considerations. The short answer is that it depends on context — but I can give you a framework to think through it. Would a step-by-step breakdown be helpful here?",
  "I'd love to help you with this! Based on what you've described, there are a few key areas to focus on. The approach I'd recommend involves careful planning, clear communication, and iterative refinement. Want me to elaborate on any of these?",
];

function generateResponse(): string {
  return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
}

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || status !== "idle") return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus("sending");

      // Simulate network latency before showing typing indicator
      await new Promise((resolve) => setTimeout(resolve, 150));
      setStatus("typing");

      // Simulate AI response delay (1.5–3s)
      const delay = 1500 + Math.random() * 1500;
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, delay);
      });

      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: generateResponse(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setStatus("idle");
    },
    [status],
  );

  const isTyping = status === "typing";
  const isDisabled = status !== "idle";

  return { messages, sendMessage, isTyping, isDisabled };
}

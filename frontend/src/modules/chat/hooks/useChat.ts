import { useState } from "react";
import { Message } from "../types";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (input: string) => {
    if (!input) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);

    const res = await fetch("/chat/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.message.content },
    ]);
  };

  return { messages, sendMessage };
}
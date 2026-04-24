"use client";

import React, { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type InputBoxProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function InputBox({ messages, setMessages }: InputBoxProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    // Show user message immediately
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/chat/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMessages }),
    });
    console.log("API Response:", res);
    const data = await res.json();

    // Add assistant response
    setMessages([
      ...newMessages,
      { role: "assistant", content: data.message.content },
    ]);

  };

  return (
    <div className="w-full max-w-2xl border border-gray-700 rounded-2xl p-4 bg-[#111] flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
        className="flex-1 bg-transparent outline-none text-gray-300"
      />

      <button
        onClick={sendMessage}
        className="bg-white text-black px-4 py-1 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
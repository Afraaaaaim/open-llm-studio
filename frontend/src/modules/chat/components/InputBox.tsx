"use client";

import { useState } from "react";

type InputBoxProps = {
  onSend: (input: string) => void;
};

export default function InputBox({ onSend }: InputBoxProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend(input);
      setInput("");
    }
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
        onClick={() => { onSend(input); setInput(""); }}
        className="bg-white text-black px-4 py-1 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
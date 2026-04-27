"use client";

import { useChat } from "../hooks/useChat";
import InputBox from "./InputBox";
import Suggestions from "./Suggestions";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

export default function ChatLayout() {
  const { messages, sendMessage } = useChat();
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen w-full relative overflow-hidden bg-black font-sans">
      {/* --- TOP RIGHT HEADER --- */}
      <div
        className={`absolute top-6 right-8 text-gray-400 font-semibold text-lg transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 ${
          hasMessages ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        gemma3:1b
      </div>

      {/* --- INITIAL EMPTY STATE: TITLE --- */}
      <div
        className={`absolute left-0 right-0 top-[20vh] flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 ${
          hasMessages
            ? "opacity-0 -translate-y-12 scale-95 pointer-events-none"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <h1 className="text-4xl font-semibold text-gray-300 tracking-tight drop-shadow-md">
          gemma3:1b
        </h1>
      </div>

      {/* --- INITIAL EMPTY STATE: SUGGESTIONS --- */}
      <div
        className={`absolute left-0 right-0 top-[62vh] flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 ${
          hasMessages
            ? "opacity-0 translate-y-12 scale-95 pointer-events-none"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <div className="w-full flex justify-center">
          <Suggestions />
        </div>
      </div>

      {/* --- CHAT MESSAGES AREA --- */}
      <div
        className={`flex-1 flex flex-col gap-6 px-4 md:px-8 pt-24 pb-8 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 scroll-smooth ${
          hasMessages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-5 py-3.5 rounded-2xl max-w-[85%] md:max-w-[70%] lg:max-w-[60%] shadow-md ${
                msg.role === "user"
                  ? "bg-white text-black"
                  : "bg-[#1e1e1e] text-gray-200 border border-[#333]"
              }`}
            >
               <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code: CodeBlock,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- INPUT BOX CONTAINER --- */}
      <div
        className={`w-full flex justify-center shrink-0 px-4 md:px-8 mb-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 ${
          hasMessages ? "translate-y-0" : "-translate-y-[48vh]"
        }`}
      >
        <div className="w-full max-w-3xl transition-all duration-700">
          <InputBox onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}
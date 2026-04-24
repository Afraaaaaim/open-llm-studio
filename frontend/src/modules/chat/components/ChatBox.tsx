"use client";

import { useState } from "react";

import InputBox from "./InputBox";
import Suggestions from "./Suggestions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// export default function ChatLayout() {
//   const [messages, setMessages] = useState<Message[]>([]);

//   return (
//     <div className="flex-1 flex flex-col items-center h-screen">

//       {messages.length === 0 ? (
//         /* --- 1. INITIAL EMPTY STATE --- */
//         <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl px-4">
//           <h1 className="text-3xl font-semibold text-gray-300 mb-8">
//             gemma3:1b
//           </h1>

//           <div className="w-full mb-8 flex justify-center">
//             <Suggestions />
//           </div>

//           {/* Centered, larger Input Box */}
//           <div className="w-full flex justify-center">
//             <InputBox messages={messages} setMessages={setMessages} />
//           </div>
//         </div>
//       ) : (
//         /* --- 2. ACTIVE CHAT STATE --- */
//         <>
//           {/* Chat messages */}
//           <div className="w-full max-w-2xl flex flex-col gap-4 px-4 mt-6 overflow-y-auto flex-1">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-xl max-w-[70%] ${
//                     msg.role === "user"
//                       ? "bg-white text-black"
//                       : "bg-[#222] text-gray-200"
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input pinned to bottom */}
//           <div className="mt-auto mb-6 w-full max-w-2xl px-4 flex justify-center">
//             <InputBox messages={messages} setMessages={setMessages} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Boolean to track if we should show the active chat state
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen w-full relative overflow-hidden bg-black font-sans">
      {/* --- TOP RIGHT HEADER --- */}
      {/* Fades in and slides down slightly when chat starts */}
      <div
        className={`absolute top-6 right-8 text-gray-400 font-semibold text-lg transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 ${
          hasMessages ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        gemma3:1b
      </div>

      {/* --- INITIAL EMPTY STATE: TITLE --- */}
      {/* Positioned highly, fades out and floats upwards when chat starts */}
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
      {/* Positioned below the input box, fades out and floats downwards when chat starts */}
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
      {/* Fades in and slides up from the bottom when chat starts */}
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
              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* --- INPUT BOX CONTAINER --- */}
      {/* This is placed at the bottom of the DOM. 
        When empty, it translates UP by 48vh so it rests perfectly between 
        the Title (20vh) and the Suggestions (62vh).
        When a message is sent, it smoothly glides down to the bottom.
      */}
      <div
        className={`w-full flex justify-center shrink-0 px-4 md:px-8 mb-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 ${
          hasMessages ? "translate-y-0" : "-translate-y-[48vh]"
        }`}
      >
        <div className="w-full max-w-3xl transition-all duration-700">
          <InputBox messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
}

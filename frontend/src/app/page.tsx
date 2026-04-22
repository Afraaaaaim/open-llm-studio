import Sidebar from "@/components/layout/Sidebar";
import ChatLayout from "@/components/chat/ChatBox";

export default function Home() {
  return (
    <div className="flex h-screen bg-black text-white">

      <Sidebar />
      <ChatLayout />

    </div>
  );
}
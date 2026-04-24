import ChatLayout from "@/modules/chat/components/ChatBox";
import Sidebar from "@/shared/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <ChatLayout />
    </div>
  );
}

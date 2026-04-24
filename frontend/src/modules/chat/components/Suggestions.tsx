export default function Suggestions() {
 return (
    <div className="flex flex-col items-center gap-4 text-sm text-gray-400 w-full max-w-sm mx-auto">
      <div className="text-gray-500 mb-2">Suggested</div>
      <div className="flex flex-col gap-3 w-full">
        <button className="flex flex-col items-start bg-transparent hover:bg-[#222] p-3 rounded-xl transition-colors text-left w-full group">
          <span className="text-white font-medium group-hover:text-blue-400 transition-colors">Overcome procrastination</span>
          <span className="text-xs text-gray-500 mt-1">give me tips</span>
        </button>
        <button className="flex flex-col items-start bg-transparent hover:bg-[#222] p-3 rounded-xl transition-colors text-left w-full group">
          <span className="text-white font-medium group-hover:text-blue-400 transition-colors">Tell me a fun fact</span>
          <span className="text-xs text-gray-500 mt-1">about the Roman Empire</span>
        </button>
      </div>
    </div>
  );
}
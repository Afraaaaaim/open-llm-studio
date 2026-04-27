"use client";

import { useAuth } from "@/shared/components/layout/AuthProvider";

export default function Sidebar() {
  const { signOut } = useAuth();

  return (
    <div className="w-16 border-r border-gray-800 flex flex-col items-center py-4 gap-6">

      <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

      <div className="w-6 h-6 bg-gray-600 rounded"></div>
      <div className="w-6 h-6 bg-gray-600 rounded"></div>
      <div className="w-6 h-6 bg-gray-600 rounded"></div>

      {/* pushes sign out to the bottom */}
      <div className="mt-auto">
        <button
          onClick={signOut}
          title="Sign out"
          className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
        >
          {/* simple power icon using SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="w-5 h-5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
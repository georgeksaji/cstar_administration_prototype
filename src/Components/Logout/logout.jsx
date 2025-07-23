import React from "react";
import { LogOut } from 'lucide-react'; 

function Logout() {
  return (
    <div className="px-4 py-4 border-t border-slate-200">
      <a
        href="#"
        className="flex items-center px-4 py-2 rounded-md transition-colors duration-200 font-medium text-red-600 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-3" />
        <span>Logout</span>
      </a>
    </div>
  );
}

export default Logout;
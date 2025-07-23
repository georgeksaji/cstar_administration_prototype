import React from 'react';
import { Menu } from 'lucide-react';

function Header({ Name, onMenuClick }) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center space-x-4">
                <button onClick={onMenuClick} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 sm:hidden">
                    <Menu size={20} />
                </button>
                <h2 className="text-lg font-semibold text-slate-800">Welcome, {Name}</h2>
            </div>
            <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                {Name.charAt(0)}
            </div>
        </header>
    );
}
export default Header;
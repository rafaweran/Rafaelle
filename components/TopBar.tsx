import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Doctor } from '../types';

interface TopBarProps {
  doctor: Doctor;
  toggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ doctor, toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-20 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md">
          <Menu size={24} />
        </button>
        
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-all"
            placeholder="Pesquisar pacientes ou prontuários..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
            <p className="text-xs text-slate-500">{doctor.specialty}</p>
          </div>
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-teal-100 ring-2 ring-white shadow-sm"
            src={doctor.avatar}
            alt={doctor.name}
          />
        </div>
      </div>
    </header>
  );
};
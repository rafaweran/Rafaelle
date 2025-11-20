import React from 'react';
import { Home, Users, MessageSquare, Calendar, DollarSign, Settings, LogOut, Activity } from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const menuItems = [
    { id: 'home' as NavigationItem, label: 'Home', icon: Home },
    { id: 'patients' as NavigationItem, label: 'Pacientes', icon: Users },
    { id: 'chat' as NavigationItem, label: 'Chat', icon: MessageSquare },
    { id: 'agenda' as NavigationItem, label: 'Agenda', icon: Calendar },
    { id: 'finance' as NavigationItem, label: 'Financeiro', icon: DollarSign },
    { id: 'settings' as NavigationItem, label: 'Configurações', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center h-20 border-b border-slate-100">
        <div className="flex items-center gap-2 text-teal-600">
          <Activity size={32} />
          <span className="text-2xl font-bold tracking-tight">Med.co</span>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} className={`mr-3 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
        <button 
          onClick={() => setActiveTab('logout')}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Sair
        </button>
      </div>
    </aside>
  );
};
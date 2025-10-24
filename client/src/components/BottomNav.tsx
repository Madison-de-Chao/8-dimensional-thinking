
import React from 'react';
import type { View } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
  cycleStarted: boolean;
}

const NavItem: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, isActive, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 flex flex-col items-center justify-center p-2 text-xs transition-colors duration-200 ${
        isActive ? 'text-amber-dark' : 'text-gray-500'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-light'}`}
    >
      <span className="text-2xl mb-1">
        {label === '首頁' && '🏠'}
        {label === '日誌' && '📖'}
        {label === '洞察' && '💡'}
        {label === '設定' && '⚙️'}
      </span>
      {label}
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, cycleStarted }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex">
      <NavItem
        label="首頁"
        isActive={currentView === 'HOME'}
        onClick={() => setView('HOME')}
        disabled={!cycleStarted}
      />
      <NavItem
        label="日誌"
        isActive={currentView === 'JOURNAL'}
        onClick={() => setView('JOURNAL')}
        disabled={!cycleStarted}
      />
      <NavItem
        label="洞察"
        isActive={currentView === 'INSIGHTS'}
        onClick={() => setView('INSIGHTS')}
        disabled={!cycleStarted}
      />
      <NavItem
        label="設定"
        isActive={currentView === 'SETTINGS'}
        onClick={() => setView('SETTINGS')}
      />
    </div>
  );
};

export default BottomNav;

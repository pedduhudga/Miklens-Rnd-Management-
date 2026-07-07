import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { auth } from '../config/firebase';

export const Header: React.FC = () => {
  const { currentUser, userRole } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white/50 px-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/50">
      <div className="flex items-center">
        {/* Mobile menu button could go here */}
      </div>
      <div className="flex items-center space-x-4">
        <a href="/profile" className="flex items-center space-x-2 text-sm hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="hidden flex-col md:flex">
            <span className="font-medium text-gray-900 dark:text-white">
              {currentUser?.email || 'Guest User'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {userRole}
            </span>
          </div>
        </a>
        <button
          onClick={handleLogout}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

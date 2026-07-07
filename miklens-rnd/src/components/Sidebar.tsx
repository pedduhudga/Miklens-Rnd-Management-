import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FlaskConical, Beaker, FileText, BarChart3, Edit3, Settings, FolderGit2, CheckSquare, FileStack, CalendarDays, CheckCircle, Sparkles, Database, Bell, TestTube2, MapPin, Eye } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Daily Log', href: '/research-log', icon: Edit3 },
  { name: 'AI Insights', href: '/ai-insights', icon: Sparkles },
  { name: 'Products', href: '/products', icon: FlaskConical },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Experiments', href: '/experiments', icon: Beaker },
  { name: 'Field Trials', href: '/field-trials', icon: MapPin },
  { name: 'Lab Tests', href: '/lab-tests', icon: TestTube2 },
  { name: 'Observations', href: '/observations', icon: Eye },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Approvals', href: '/approvals', icon: CheckCircle },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Documents', href: '/documents', icon: FileStack },
  { name: 'Calendar', href: '/calendar', icon: CalendarDays },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Audit Logs', href: '/audit-logs', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/50">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Miklens Bio</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

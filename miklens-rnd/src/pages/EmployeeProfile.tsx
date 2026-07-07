import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, CheckCircle, FileText } from 'lucide-react';

const mockPerformanceData = [
  { month: 'Jan', innovation: 4, knowledge: 5 },
  { month: 'Feb', innovation: 6, knowledge: 6 },
  { month: 'Mar', innovation: 5, knowledge: 8 },
  { month: 'Apr', innovation: 8, knowledge: 7 },
  { month: 'May', innovation: 7, knowledge: 9 },
  { month: 'Jun', innovation: 9, knowledge: 10 },
];

export const EmployeeProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="h-32 bg-blue-600 sm:h-48"></div>
        <div className="px-4 pb-6 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img className="h-24 w-24 rounded-full ring-4 ring-white dark:ring-gray-900 sm:h-32 sm:w-32" src="https://i.pravatar.cc/150?u=1" alt="" />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white">Dr. Sarah Jenkins</h1>
                <p className="text-gray-500 dark:text-gray-400">Lead Microbiologist</p>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Mail className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white">Dr. Sarah Jenkins</h1>
            <p className="text-gray-500 dark:text-gray-400">Lead Microbiologist</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              {/* About Section */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Microbiology', 'Fungal Pathology', 'Data Analysis', 'PCR'].map(skill => (
                    <span key={skill} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/50 dark:text-blue-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Summary */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
                <h3 className="flex items-center font-medium text-blue-900 dark:text-blue-200 mb-2">
                  <CheckCircle className="mr-2 h-4 w-4" /> AI Summary
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Sarah has shown consistent innovation in BioShield Alpha trials. Recent failures in EXP-2023-089 yielded highly valuable learning outcomes contributing to a pivot in formulation strategy.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              {/* Performance Graph */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Research Value Creation</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorInnovation" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorKnowledge" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                      <Area type="monotone" dataKey="innovation" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInnovation)" name="Innovation Index" />
                      <Area type="monotone" dataKey="knowledge" stroke="#10b981" fillOpacity={1} fill="url(#colorKnowledge)" name="Knowledge Base Additions" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Recent Research Logs</h3>
                <ul className="space-y-4">
                  {[1, 2, 3].map((log) => (
                    <li key={log} className="flex space-x-3 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Logged activities for BioShield Alpha</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{log}d ago</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed efficacy testing against Botrytis cinerea.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

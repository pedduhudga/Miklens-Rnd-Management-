import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Products } from './pages/Products';
import { Experiments } from './pages/Experiments';
import { Reports } from './pages/Reports';
import { Analytics } from './pages/Analytics';
import { ResearchLog } from './pages/ResearchLog';
import { EmployeeProfile } from './pages/EmployeeProfile';
import { Settings } from './pages/Settings';
import { Projects } from './pages/Projects';
import { Tasks } from './pages/Tasks';
import { Documents } from './pages/Documents';
import { Calendar } from './pages/Calendar';
import { Approvals } from './pages/Approvals';
import { AIInsights } from './pages/AIInsights';
import { AuditLogs } from './pages/AuditLogs';
import { Notifications } from './pages/Notifications';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/experiments" element={<Experiments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/research-log" element={<ResearchLog />} />
                <Route path="/profile" element={<EmployeeProfile />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/approvals" element={<Approvals />} />
                <Route path="/ai-insights" element={<AIInsights />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

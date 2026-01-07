import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Landing from '@/pages/Landing';
import Insights from '@/pages/Insights';
import Budget from '@/pages/Budget';
import Expenses from '@/pages/Expenses';
import History from '@/pages/History';
import Settings from '@/pages/Settings';
import Layout from '@/components/Layout';
import { useAuth } from '@/store/useAuth';

function Protected({ children }: { children?: React.ReactNode }) {
  const token = useAuth((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children ?? <Outlet />}</Layout>;
}

function App() {
  const token = useAuth((s) => s.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Landing /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" replace />} />

        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* redirect common typo */}
        <Route path="/expences" element={<Navigate to="/expenses" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

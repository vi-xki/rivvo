import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/store/useAuth';
import { useToast } from '@/components/ui/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Simple client validation
    if (!email || !password) {
      toast.push({ title: 'Please fill email and password' });
      return;
    }

    try {
      await auth.login(email, password);
      toast.push({ title: 'Logged in' });
      navigate('/dashboard');
    } catch (err: any) {
      toast.push({ title: err?.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
      <div className="w-full max-w-md p-8 bg-card border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
            </label>
            <a className="text-sm text-primary" href="#">Forgot?</a>
          </div>

          <Button type="submit" className="w-full">{auth.loading ? 'Loading...' : 'Login'}</Button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/store/useAuth';
import { useToast } from '@/components/ui/Toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const passwordStrength = (p: string) => {
    if (p.length > 8) return 'Strong';
    if (p.length >= 6) return 'Medium';
    return 'Weak';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.push({ title: 'Please fill all fields' });
      return;
    }

    try {
      await auth.signup(name, email, password);
      toast.push({ title: 'Account created' });
      navigate('/');
    } catch (err: any) {
      toast.push({ title: err?.response?.data?.message || 'Signup failed' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
      <div className="w-full max-w-md p-8 bg-card border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="text-sm text-muted-foreground">Password strength: <span className="font-medium">{passwordStrength(password)}</span></div>

          <Button type="submit" className="w-full">{auth.loading ? 'Loading...' : 'Sign Up'}</Button>
        </form>
      </div>
    </div>
  );
}


import { useEffect, useRef, useState, useCallback } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useExpenses } from '@/store/useExpenses';
import { useToast } from '@/components/ui/Toast';
import api from '@/services/api';

type Props = { open: boolean; onClose: () => void };

const defaultCategories = [
  { id: 'food', name: 'Food' },
  { id: 'transport', name: 'Transport' },
  { id: 'ent', name: 'Entertainment' },
  { id: 'bills', name: 'Bills' },
];

export default function AddExpense({ open, onClose }: Props) {
  const amountRef = useRef<HTMLInputElement | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(defaultCategories[0].id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [quickAdd, setQuickAdd] = useState(true);
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [catList, setCatList] = useState<typeof defaultCategories>(defaultCategories);
  useEffect(() => {
    let mounted = true;
    api.get('/categories/list').then((res) => {
      if (!mounted) return;
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        setCatList(data);
        // if current category not present in fetched list, reset to first fetched id
        if (!data.find((c: any) => String(c.id) === category)) {
          setCategory(String(data[0].id));
        }
      }
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);
  const addExpenseOpt = useExpenses((s) => s.addExpense);
  const toast = useToast();

  useEffect(() => {
    if (open) {
      setTimeout(() => amountRef.current?.focus(), 100);
      const last = localStorage.getItem('rivvo:lastCategory');
      if (last && quickAdd) setCategory(last);
    }
  }, [open, quickAdd]);

  const formatCurrency = (v: string) => {
    if (!v) return '';
    try {
      const n = parseFloat(v);
      return isNaN(n) ? v : new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
    } catch (e) {
      return v;
    }
  };

  const submit = useCallback(async (e?: any) => {
    if (e) e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      toast.push({ title: 'Enter a valid amount' });
      return;
    }
    setLoading(true);
    const selected = catList.find((c) => String(c.id) === category);
    const resolvedCategoryId = selected ? selected.id : (Number.isNaN(Number(category)) ? category : Number(category));
    const payload = {
      amount: amt,
      categoryId: resolvedCategoryId,
      date,
      note,
      recurring: recurring ? { pattern: 'monthly' } : undefined,
    } as any;

    const res = await addExpenseOpt(payload);
    setLoading(false);

    if (res) {
      if (quickAdd) localStorage.setItem('rivvo:lastCategory', category);
      toast.push({ title: 'Expense added' });
      onClose();
      setAmount('');
      setNote('');
    } else {
      toast.push({ title: 'Failed to add expense' });
    }
  }, [amount, category, date, note, recurring, quickAdd, addExpenseOpt, toast, onClose]);

  // categories filtered by query (from server when available)
  const categories = catList.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  // keyboard handlers
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') submit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, submit]);

  return (
    <Modal open={open} onClose={onClose} title="Add Expense">
      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-2 border rounded-md bg-background"
          placeholder="0.00"
          ref={amountRef}
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="text-sm text-muted-foreground">{amount ? formatCurrency(amount) : ' '}</div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input className="w-full p-2 border rounded-md bg-background mb-2" placeholder="Search categories" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md bg-background">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Input label="Note (optional)" type="text" value={note} onChange={(e) => setNote(e.target.value)} />

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} /> Recurring (monthly)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={quickAdd} onChange={(e) => setQuickAdd(e.target.checked)} /> Quick-add</label>
        </div>

        <div className="flex items-center justify-between">
          {/* <div className="text-sm text-muted-foreground">Press <kbd>Enter</kbd> to submit or <kbd>Esc</kbd> to cancel</div> */}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Adding…' : 'Add'}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

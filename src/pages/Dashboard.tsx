import { useEffect, useState } from 'react';
import { getSummary, type Summary } from '@/services/dashboard';
import Skeleton from '@/components/ui/Skeleton';
import AddExpense from '@/components/AddExpense';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import SavingsCard from '@/components/SavingsCard';

export default function Dashboard() {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        getSummary()
            .then((s) => {
                if (mounted) setSummary(s);
            })
            .catch(() => {
                // ignore, show empty state
            })
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false };
    }, []);

    const fmt = (n?: number) => n == null ? '—' : new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

    // confetti demo
    const fireConfetti = async () => {
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        // dependency may not be installed during demo
        // no-op
      }
    };

    return (
        <div className="p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your finances this month.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" onClick={fireConfetti}>Celebrate</Button>
                    <Button variant="primary" onClick={() => setOpenAdd(true)}>Add Expense</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border rounded-xl shadow-card">
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">Total Spent</h2>
                    {loading ? <Skeleton className="h-8 w-36" /> : <p className="text-3xl font-bold">{fmt(summary?.totalSpent)}</p>}
                    {loading ? <Skeleton className="h-4 w-24 mt-2" /> : <span className="text-xs text-success font-medium">{summary ? '+2.5% from last month' : ''}</span>}
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-card">
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">Budget Remaining</h2>
                    {loading ? <Skeleton className="h-8 w-36" /> : <p className="text-3xl font-bold">{fmt(summary?.remaining)}</p>}
                    {loading ? <Skeleton className="h-4 w-full mt-3" /> : <div className="mt-3"><Progress value={summary ? Math.max(0, Math.min(100, (1 - (summary.remaining / (summary.totalSpent + summary.remaining || 1))) * 100)) : 0} label="Utilization" /></div>}
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-card">
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">Daily Average</h2>
                    {loading ? <Skeleton className="h-8 w-36" /> : <p className="text-3xl font-bold">{fmt(summary?.dailyAverage)}</p>}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-card border rounded-xl p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Category</h3>
                    {loading ? <Skeleton className="h-8 w-48" /> : summary?.topCategory ? <div className="font-medium">{summary.topCategory.name} — {fmt(summary.topCategory.amount)}</div> : <div className="text-sm text-muted-foreground">No data yet</div>}
                </section>

                <section className="bg-card border rounded-xl p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Activity</h3>
                    <div className="text-sm text-muted-foreground">View your latest expenses on the History page.</div>
                </section>
            </div>

            <div className="mt-6">
              <SavingsCard goal={1200} saved={summary ? Math.max(0, Math.round((summary.remaining || 0) / 1)) : 720} onCelebrate={fireConfetti} />
            </div>

            <AddExpense open={openAdd} onClose={() => setOpenAdd(false)} />
        </div>
    );
}

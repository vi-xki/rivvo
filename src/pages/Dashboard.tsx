import { useEffect, useState } from 'react';
import { getSummary, type Summary } from '@/services/dashboard';
import Skeleton from '@/components/ui/Skeleton';
import AddExpense from '@/components/AddExpense';

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

    return (
        <div className="p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your finances this month.</p>
                </div>
                <div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium" onClick={() => setOpenAdd(true)}>Add Expense</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">Total Spent</h2>
                    {loading ? <Skeleton className="h-8 w-36" /> : <p className="text-3xl font-bold">{fmt(summary?.totalSpent)}</p>}
                    {loading ? <Skeleton className="h-4 w-24 mt-2" /> : <span className="text-xs text-emerald-500 font-medium">{summary ? '+2.5% from last month' : ''}</span>}
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">Budget Remaining</h2>
                    {loading ? <Skeleton className="h-8 w-36" /> : <p className="text-3xl font-bold">{fmt(summary?.remaining)}</p>}
                    <div className="w-full h-2 bg-muted rounded-full mt-3">
                        {loading ? <div className="h-full bg-muted/40 rounded-full" /> : <div className={`h-full ${((summary && summary.remaining) ? 'bg-primary' : 'bg-rose-500')} rounded-full`} style={{ width: summary ? `${Math.max(0, Math.min(100, (1 - (summary.remaining / (summary.totalSpent + summary.remaining || 1))) * 100))}%` : '' } as any}></div>}
                    </div>
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-sm">
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

            <AddExpense open={openAdd} onClose={() => setOpenAdd(false)} />
        </div>
    );
}

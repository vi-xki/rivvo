import { useEffect, useState } from 'react';
import { useExpenses } from '@/store/useExpenses';
import Skeleton from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';

export default function Expenses() {
  const [page, setPage] = useState(1);
  const { list, loading, error, fetchExpenses, deleteExpense, total, hasMore } = useExpenses();

  useEffect(() => {
    fetchExpenses({}, page);
  }, [page, fetchExpenses]);

  return (
    <div className="p-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">All your expenses. Filter by month or category.</p>
        </div>
        <div className="text-sm text-muted-foreground">Total: {total ?? '—'}</div>
      </header>

      <section className="bg-card border rounded-lg p-6">
        {loading && list.length === 0 ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : list.length === 0 ? (
          <div className="text-muted-foreground">No expenses yet — add your first expense.</div>
        ) : (
          <ul className="divide-y">
            {list.map((e: any) => (
              <li key={e.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.category?.name ?? '—'}</div>
                  <div className="text-sm text-muted-foreground">{new Date(e.date).toLocaleDateString()} • {e.note ?? ''}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(e.amount)}</div>
                  <Button variant="ghost" onClick={() => deleteExpense(e.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-center">
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <Button onClick={() => setPage((p) => p + 1)} disabled={!hasMore}>{hasMore ? 'Load more' : 'No more'}</Button>
          )}
        </div>

        {error && <div className="text-sm text-rose-500 mt-3">{String(error)}</div>}
      </section>
    </div>
  );
}

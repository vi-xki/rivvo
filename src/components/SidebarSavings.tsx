import { useMemo } from 'react';
import CircularProgress from '@/components/ui/CircularProgress';
import { useGoals } from '@/store/useGoals';

export default function SidebarSavings() {
  const goals = useGoals((s) => s.goals);

  const { totalSaved, totalTarget, pct } = useMemo(() => {
    const totalSaved = goals.reduce((s, g) => s + (g.saved || 0), 0);
    const totalTarget = goals.reduce((s, g) => s + (g.target || 0), 0) || 100;
    const pct = totalTarget ? Math.round((totalSaved / totalTarget) * 100) : 0;
    return { totalSaved, totalTarget, pct };
  }, [goals]);

  return (
    <div className="px-6 mb-6">
      <div className="bg-card/60 border rounded-lg p-3 flex items-center gap-3">
        <div className="shrink-0 text-success">
          <CircularProgress value={pct} size={44} stroke={6} label={`${pct}%`} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">Savings</div>
          {totalTarget > 0 ? (
            <div className="text-xs text-muted-foreground">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(totalSaved)} / {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(totalTarget)}</div>
          ) : (
            <div className="text-xs text-muted-foreground">No goals yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

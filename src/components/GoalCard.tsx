import { useGoals } from '@/store/useGoals';
import type { Goal } from '@/store/useGoals';
import CircularProgress from '@/components/ui/CircularProgress';
import Button from '@/components/ui/Button';

export default function GoalCard({ goal }: { goal: Goal }) {
  const updateSaved = useGoals((s) => s.updateSaved);
  const removeGoal = useGoals((s) => s.removeGoal);
  const markAchieved = useGoals((s) => s.markAchieved);

  const fmt = (n: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

  const handleAdd = async () => {
    updateSaved(goal.id, 50);
    const nextSaved = Math.min(goal.target, goal.saved + 50);
    if (nextSaved >= goal.target) {
      markAchieved(goal.id);
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="bg-card border rounded-xl p-4 shadow-card flex items-center gap-4">
      <div className="shrink-0 text-success">
        <CircularProgress value={(goal.saved / Math.max(1, goal.target)) * 100} size={72} stroke={8} label={`${Math.round((goal.saved / Math.max(1, goal.target)) * 100)}%`} />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium">{goal.title}</h4>
            <div className="text-sm text-muted-foreground">{fmt(goal.saved)} of {fmt(goal.target)}</div>
          </div>
          <div className="text-sm text-muted-foreground">{goal.achieved ? '🎉 Achieved' : ''}</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button variant="ghost" onClick={handleAdd}>+ $50</Button>
          <Button variant="primary" onClick={() => updateSaved(goal.id, Math.round((goal.target - goal.saved) * 0.25))}>Deposit 25%</Button>
          <Button variant="ghost" onClick={() => removeGoal(goal.id)}>Remove</Button>
        </div>
      </div>
    </div>
  );
}

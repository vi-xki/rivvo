import Progress from './ui/Progress';
import Button from './ui/Button';

type Props = {
  goal: number;
  saved: number;
  onCelebrate?: () => void;
};

export default function SavingsCard({ goal, saved, onCelebrate }: Props) {
  const pct = goal > 0 ? (saved / goal) * 100 : 0;
  return (
    <div className="bg-card border rounded-xl p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Savings Goal</h4>
          <div className="text-xl font-bold mt-1">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(saved)}</div>
          <div className="text-sm text-muted-foreground">of {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(goal)}</div>
        </div>
        <div className="ml-4">
          <Button variant="highlight" onClick={onCelebrate}>Celebrate</Button>
        </div>
      </div>

      <div className="mt-4">
        <Progress value={pct} label={`${Math.round(pct)}% toward goal`} />
      </div>
    </div>
  );
}

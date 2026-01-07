type Props = {
  value: number; // 0-100
  label?: string;
  size?: 'sm' | 'md';
};

export default function Progress({ value, label, size = 'md' }: Props) {
  const height = size === 'sm' ? 'h-2' : 'h-3';
  return (
    <div>
      {label && <div className="text-sm text-muted-foreground mb-2">{label}</div>}
      <div className={`w-full bg-muted rounded-full ${height} overflow-hidden`}>
        <div
          className="bg-primary h-full rounded-full transition-all"
          style={{ width: `${Math.max(0, Math.min(100, Math.round(value)))}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
        />
      </div>
    </div>
  );
}

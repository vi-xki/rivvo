type Props = {
  value: number; // 0-100
  size?: number; // px
  stroke?: number;
  className?: string;
  label?: string;
};

export default function CircularProgress({ value, size = 64, stroke = 8, className = '', label }: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, value)) / 100);

  // Progress uses primary color explicitly for better contrast in light sidebars
  const progressStroke = 'hsl(var(--primary))';
  const trackStroke = 'hsl(var(--border))';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center ${className}`}
      style={{ width: size }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(Math.max(0, Math.min(100, value)))}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="transparent" stroke={trackStroke} strokeWidth={stroke} />
          <circle
            r={radius}
            fill="transparent"
            stroke={progressStroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90)`}
          />
        </g>
      </svg>
      {label && <div className="mt-2 text-sm text-muted-foreground">{label}</div>}
    </div>
  );
}
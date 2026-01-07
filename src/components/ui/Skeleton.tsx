export default function Skeleton({ className = '', style = {} }: any) {
  return (
    <div
      className={`animate-pulse bg-muted/40 rounded ${className}`}
      style={style}
      aria-hidden
    />
  );
}

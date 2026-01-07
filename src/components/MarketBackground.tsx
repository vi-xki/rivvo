import { useLocation } from 'react-router-dom';

export default function MarketBackground() {
  const location = useLocation();
  // Treat root (/) or landing path as the 'landing' intensity — stronger waves
  const isLanding = location.pathname === '/' || location.pathname === '/landing';
  const intensityClass = isLanding ? 'market-intensity-strong' : 'market-intensity-subtle';

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 hidden md:block ${intensityClass}`} aria-hidden>
      <svg viewBox="0 0 1440 360" className="w-full h-full" preserveAspectRatio="none">
        <g className="wave-1">
          <path style={{ fill: 'hsl(var(--primary) / var(--wave1-opacity, 0.08))' }} d="M0,160 C160,220 320,100 480,140 C640,180 800,80 960,120 C1120,160 1280,100 1440,140 L1440,360 L0,360 Z" />
        </g>
        <g className="wave-2">
          <path style={{ fill: 'hsl(var(--accent) / var(--wave2-opacity, 0.06))' }} d="M0,200 C160,240 320,140 480,160 C640,180 800,120 960,140 C1120,160 1280,140 1440,160 L1440,360 L0,360 Z" />
        </g>
        <g className="wave-3">
          <path style={{ fill: 'hsl(var(--highlight) / var(--wave3-opacity, 0.04))' }} d="M0,240 C160,260 320,180 480,190 C640,200 800,160 960,170 C1120,180 1280,160 1440,170 L1440,360 L0,360 Z" />
        </g>
      </svg>
    </div>
  );
}
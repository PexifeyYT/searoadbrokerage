'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10000, suffix: '+', label: 'Loads Delivered', prefix: '' },
  { value: 500, suffix: '+', label: 'Trusted Carriers', prefix: '' },
  { value: 98, suffix: '%', label: 'On-Time Rate', prefix: '' },
  { value: 5, suffix: '+', label: 'Years Experience', prefix: '' },
];

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatItem({ value, suffix, label, prefix, active, light }: {
  value: number; suffix: string; label: string; prefix: string; active: boolean; light?: boolean;
}) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="text-center p-6">
      <p className={`text-4xl sm:text-5xl font-bold mb-2 tabular-nums ${light ? 'text-gray-900' : 'text-white'}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className={`text-sm font-medium uppercase tracking-wider ${light ? 'text-gray-500' : 'text-blue-300/80'}`}>{label}</p>
    </div>
  );
}

export default function StatsCounter({ light }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`grid grid-cols-2 lg:grid-cols-4 divide-x ${light ? 'divide-gray-200' : 'divide-white/10'}`}>
      {stats.map((stat, i) => (
        <StatItem key={stat.label} {...stat} active={active} light={light} />
      ))}
    </div>
  );
}

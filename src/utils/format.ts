export function formatRate(rate: number, decimals = 1): string {
  return `${(rate * 100).toFixed(decimals)}%`;
}

export function formatCount(n: number): string {
  return n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n);
}

export function rateColor(rate: number, thresholds = { good: 0.05, warn: 0.02 }): string {
  if (rate >= thresholds.good) return '#22c55e';
  if (rate >= thresholds.warn) return '#f59e0b';
  return '#ef4444';
}

export function deltaLabel(current: number, previous: number): string {
  if (previous === 0) return '—';
  const pct = ((current - previous) / previous) * 100;
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

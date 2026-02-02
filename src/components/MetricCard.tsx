interface Props {
  label: string;
  value: string;
  sub?: string;
}

export function MetricCard({ label, value, sub }: Props) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <p style={styles.value}>{value}</p>
      {sub && <p style={styles.sub}>{sub}</p>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#1e1e2e',
    border: '1px solid #313145',
    borderRadius: 8,
    padding: '16px 20px',
    minWidth: 140,
  },
  label: { margin: 0, fontSize: 12, color: '#8888aa', textTransform: 'uppercase', letterSpacing: 1 },
  value: { margin: '6px 0 0', fontSize: 28, fontWeight: 700, color: '#e0e0f0' },
  sub:   { margin: '4px 0 0', fontSize: 12, color: '#6688aa' },
};

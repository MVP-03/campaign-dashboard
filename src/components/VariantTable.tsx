import { VariantComparison } from '../types/campaign';

interface Props {
  variants: VariantComparison[];
}

function pct(n: number) { return `${(n * 100).toFixed(1)}%`; }

export function VariantTable({ variants }: Props) {
  if (variants.length === 0) return <p style={{ color: '#8888aa' }}>No variant data.</p>;
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {['Variant', 'Sent', 'Open %', 'Reply %', 'Booking %', ''].map(h => (
            <th key={h} style={styles.th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {variants.map(v => (
          <tr key={v.variant} style={v.winner ? styles.winnerRow : undefined}>
            <td style={styles.td}>{v.variant}</td>
            <td style={styles.td}>{v.sent.toLocaleString()}</td>
            <td style={styles.td}>{pct(v.openRate)}</td>
            <td style={styles.td}>{pct(v.replyRate)}</td>
            <td style={styles.td}>{pct(v.bookingRate)}</td>
            <td style={styles.td}>{v.winner ? '🏆 Winner' : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles: Record<string, React.CSSProperties> = {
  table:     { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th:        { textAlign: 'left', padding: '8px 12px', color: '#8888aa', fontWeight: 600, borderBottom: '1px solid #313145' },
  td:        { padding: '10px 12px', color: '#e0e0f0', borderBottom: '1px solid #24243a' },
  winnerRow: { background: '#1a2a1a' },
};

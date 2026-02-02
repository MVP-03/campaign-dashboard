import { useState } from 'react';
import { CAMPAIGNS } from './data/campaigns';
import { summariseCampaigns, compareVariants } from './utils/metrics';
import { MetricCard } from './components/MetricCard';
import { SummaryChart } from './components/SummaryChart';
import { VariantTable } from './components/VariantTable';

const CAMPAIGN_NAMES = [...new Set(CAMPAIGNS.map(c => c.campaign_name))];

function pct(n: number) { return `${(n * 100).toFixed(1)}%`; }

export default function App() {
  const [selected, setSelected] = useState(CAMPAIGN_NAMES[0]);

  const summaries = summariseCampaigns(CAMPAIGNS);
  const variants  = compareVariants(CAMPAIGNS, selected);
  const overall   = summaries.reduce(
    (acc, s) => ({
      sent:   acc.sent   + s.totalSent,
      open:   acc.open   + s.totalSent * s.openRate,
      reply:  acc.reply  + s.totalSent * s.replyRate,
      booked: acc.booked + s.totalSent * s.bookingRate,
    }),
    { sent: 0, open: 0, reply: 0, booked: 0 },
  );

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <h1 style={styles.title}>Campaign Dashboard</h1>
        <p style={styles.sub}>Outbound sequence performance</p>
      </header>

      <section style={styles.cards}>
        <MetricCard label="Total Sent"    value={overall.sent.toLocaleString()} />
        <MetricCard label="Open Rate"     value={pct(overall.open / overall.sent)} />
        <MetricCard label="Reply Rate"    value={pct(overall.reply / overall.sent)} />
        <MetricCard label="Booking Rate"  value={pct(overall.booked / overall.sent)} />
      </section>

      <section style={styles.panel}>
        <h2 style={styles.sectionTitle}>Rates by Campaign</h2>
        <SummaryChart data={summaries} />
      </section>

      <section style={styles.panel}>
        <div style={styles.variantHeader}>
          <h2 style={styles.sectionTitle}>A/B Variant Analysis</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={styles.select}
          >
            {CAMPAIGN_NAMES.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <VariantTable variants={variants} />
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root:          { background: '#13131f', minHeight: '100vh', padding: '32px 40px', fontFamily: 'system-ui, sans-serif', color: '#e0e0f0' },
  header:        { marginBottom: 32 },
  title:         { margin: 0, fontSize: 26, fontWeight: 700, color: '#e0e0f0' },
  sub:           { margin: '4px 0 0', fontSize: 14, color: '#6688aa' },
  cards:         { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 },
  panel:         { background: '#1a1a2e', border: '1px solid #313145', borderRadius: 10, padding: '24px', marginBottom: 24 },
  sectionTitle:  { margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#c0c0e0' },
  variantHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  select:        { background: '#1e1e2e', border: '1px solid #313145', borderRadius: 6, color: '#e0e0f0', padding: '6px 12px', fontSize: 13 },
};

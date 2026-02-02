import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CampaignSummary } from '../types/campaign';

interface Props {
  data: CampaignSummary[];
}

export function SummaryChart({ data }: Props) {
  const chartData = data.map(d => ({
    name:         d.campaign_name.length > 18 ? d.campaign_name.slice(0, 18) + '…' : d.campaign_name,
    'Open %':     Math.round(d.openRate * 100),
    'Reply %':    Math.round(d.replyRate * 100),
    'Booking %':  Math.round(d.bookingRate * 100),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#313145" />
        <XAxis dataKey="name" tick={{ fill: '#8888aa', fontSize: 12 }} />
        <YAxis unit="%" tick={{ fill: '#8888aa', fontSize: 12 }} />
        <Tooltip
          contentStyle={{ background: '#1e1e2e', border: '1px solid #313145', borderRadius: 6 }}
          labelStyle={{ color: '#e0e0f0' }}
        />
        <Legend wrapperStyle={{ color: '#8888aa', fontSize: 12 }} />
        <Bar dataKey="Open %"    fill="#4f86c6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Reply %"   fill="#6fcf97" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Booking %" fill="#f2994a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

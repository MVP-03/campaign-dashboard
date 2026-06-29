import { CampaignSummary, VariantComparison } from '../types/campaign';

function escapeCell(val: string | number): string {
  const s = String(val);
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

function toCsv(headers: string[], rows: string[][]): string {
  const lines = [headers.map(escapeCell).join(',')];
  for (const row of rows) {
    lines.push(row.map(escapeCell).join(','));
  }
  return lines.join('\n');
}

export function summaryToCsv(summaries: CampaignSummary[]): string {
  const headers = ['campaign_name', 'totalSent', 'openRate', 'replyRate', 'positiveReplyRate', 'bookingRate'];
  const rows = summaries.map((s) => [
    s.campaign_name,
    s.totalSent,
    s.openRate,
    s.replyRate,
    s.positiveReplyRate,
    s.bookingRate,
  ].map(String));
  return toCsv(headers, rows);
}

export function variantsToCsv(variants: VariantComparison[]): string {
  const headers = ['campaign_name', 'variant', 'sent', 'openRate', 'replyRate', 'bookingRate', 'winner'];
  const rows = variants.map((v) => [
    v.campaign_name,
    v.variant,
    v.sent,
    v.openRate,
    v.replyRate,
    v.bookingRate,
    v.winner ? 'yes' : 'no',
  ].map(String));
  return toCsv(headers, rows);
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

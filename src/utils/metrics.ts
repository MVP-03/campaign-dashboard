import { CampaignRow, CampaignSummary, VariantComparison } from '../types/campaign';

function rate(num: number, den: number): number {
  return den > 0 ? Math.round((num / den) * 1000) / 1000 : 0;
}

export function summariseCampaigns(rows: CampaignRow[]): CampaignSummary[] {
  const map = new Map<string, CampaignRow[]>();
  for (const row of rows) {
    const bucket = map.get(row.campaign_name) ?? [];
    bucket.push(row);
    map.set(row.campaign_name, bucket);
  }

  return Array.from(map.entries()).map(([name, items]) => {
    const totalSent           = items.reduce((s, r) => s + r.sent, 0);
    const totalOpened         = items.reduce((s, r) => s + r.opened, 0);
    const totalReplied        = items.reduce((s, r) => s + r.replied, 0);
    const totalPositive       = items.reduce((s, r) => s + r.positive_replies, 0);
    const totalBooked         = items.reduce((s, r) => s + r.meetings_booked, 0);
    return {
      campaign_name:      name,
      totalSent,
      openRate:           rate(totalOpened,   totalSent),
      replyRate:          rate(totalReplied,  totalSent),
      positiveReplyRate:  rate(totalPositive, totalSent),
      bookingRate:        rate(totalBooked,   totalSent),
    };
  });
}

export function compareVariants(rows: CampaignRow[], campaignName: string): VariantComparison[] {
  const filtered = rows.filter(r => r.campaign_name === campaignName);
  const variantMap = new Map<string, CampaignRow[]>();
  for (const row of filtered) {
    const bucket = variantMap.get(row.variant) ?? [];
    bucket.push(row);
    variantMap.set(row.variant, bucket);
  }

  const variants: VariantComparison[] = Array.from(variantMap.entries()).map(([v, items]) => {
    const sent    = items.reduce((s, r) => s + r.sent, 0);
    const opened  = items.reduce((s, r) => s + r.opened, 0);
    const replied = items.reduce((s, r) => s + r.replied, 0);
    const booked  = items.reduce((s, r) => s + r.meetings_booked, 0);
    return {
      campaign_name: campaignName,
      variant:       v,
      sent,
      openRate:    rate(opened,  sent),
      replyRate:   rate(replied, sent),
      bookingRate: rate(booked,  sent),
      winner:      false,
    };
  });

  const topBookingRate = Math.max(...variants.map(v => v.bookingRate));
  variants.forEach(v => { v.winner = v.bookingRate === topBookingRate; });
  return variants.sort((a, b) => b.bookingRate - a.bookingRate);
}

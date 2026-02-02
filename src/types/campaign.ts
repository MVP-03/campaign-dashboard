export interface CampaignRow {
  id: string;
  campaign_name: string;
  sequence_step: number;
  variant: 'A' | 'B';
  sent: number;
  opened: number;
  replied: number;
  positive_replies: number;
  meetings_booked: number;
  send_date: string;
}

export interface CampaignSummary {
  campaign_name: string;
  totalSent: number;
  openRate: number;
  replyRate: number;
  positiveReplyRate: number;
  bookingRate: number;
}

export interface VariantComparison {
  campaign_name: string;
  variant: string;
  sent: number;
  openRate: number;
  replyRate: number;
  bookingRate: number;
  winner: boolean;
}

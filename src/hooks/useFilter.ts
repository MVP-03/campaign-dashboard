import { useState, useMemo } from 'react';
import { CampaignRow } from '../types/campaign';

export function useFilter(rows: CampaignRow[]) {
  const [search, setSearch] = useState('');
  const [minBookingRate, setMinBookingRate] = useState(0);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesSearch = r.campaign_name.toLowerCase().includes(search.toLowerCase());
      const matchesRate   = r.meetings_booked / Math.max(r.sent, 1) >= minBookingRate;
      return matchesSearch && matchesRate;
    });
  }, [rows, search, minBookingRate]);

  return { filtered, search, setSearch, minBookingRate, setMinBookingRate };
}

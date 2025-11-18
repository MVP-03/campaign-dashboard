import React from 'react';
import { CampaignSummary } from '../types/campaign';
import { summaryToCsv, downloadCsv } from '../utils/export';

interface Props {
  summaries: CampaignSummary[];
  filename?: string;
}

export function ExportButton({ summaries, filename = 'campaigns.csv' }: Props) {
  function handleClick() {
    const csv = summaryToCsv(summaries);
    downloadCsv(filename, csv);
  }

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '6px 14px',
        borderRadius: 6,
        border: '1px solid #d1d5db',
        background: '#f9fafb',
        cursor: 'pointer',
        fontSize: 13,
      }}
    >
      Export CSV
    </button>
  );
}

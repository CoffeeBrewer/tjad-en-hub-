import React, { useEffect, useState } from 'react';
import type { BemalingsPlan } from '../types';

interface HistoricalSummary {
  count: number;
  avgFrDebiet: number | null;
  minFrDebiet: number | null;
  maxFrDebiet: number | null;
  avgFilterDiepte: number | null;
}

interface Props {
  plan: BemalingsPlan;
}

const HistoricalSuggestions: React.FC<Props> = ({ plan }) => {
  const [summary, setSummary] = useState<HistoricalSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const type = plan.typeOntgraving || 'onbekend';

    fetch(`/api/historical-summary?type=${encodeURIComponent(type)}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then(data => {
        setSummary(data);
        setError(null);
      })
      .catch(() => {
        setSummary(null);
        setError(null);
      });
  }, [plan.typeOntgraving]);

  if (!summary || summary.count === 0 || error) {
    return null;
  }

  return (
    <div className="filter-config-card">
      <h4 className="preview-sub">Historische projecten (Tjaden)</h4>
      <p className="preview-small">
        Gebaseerd op {summary.count} vergelijkbare projecten:
      </p>
      {summary.avgFrDebiet != null && (
        <p>
          • Fr. debiet gemiddeld: {summary.avgFrDebiet.toFixed(1)} m³/u (
          {summary.minFrDebiet?.toFixed(1)} – {summary.maxFrDebiet?.toFixed(1)} m³/u)
        </p>
      )}
      {summary.avgFilterDiepte != null && (
        <p>
          • Gemiddelde filterdiepte: {summary.avgFilterDiepte.toFixed(2)} m NAP
        </p>
      )}
      <p className="preview-small">
        Gebruik deze waarden als referentie; het ontwerp blijft projectspecifiek.
      </p>
    </div>
  );
};

export default HistoricalSuggestions;

import React from 'react';
import { SCENARIOS, type ScenarioId } from '../lib/scenarioConfig';

interface Props {
  onSelect: (id: ScenarioId) => void;
}

const ScenarioGrid: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="scenario-grid-wrapper">
      <h2 className="scenario-title">Kies een uitgangssituatie</h2>
      <p className="scenario-subtitle">
        Selecteer het scenario dat het dichtst bij jouw project past. Je kunt alles
        hierna nog finetunen in het bemalingsplan.
      </p>

      <div className="scenario-grid">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            type="button"
            className="scenario-tile"
            onClick={() => onSelect(s.id)}
          >
            <div className="scenario-icon">{s.icon}</div>
            <div className="scenario-text">
              <div className="scenario-label">{s.label}</div>
              <div className="scenario-short">{s.short}</div>
              <div className="scenario-desc">{s.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioGrid;

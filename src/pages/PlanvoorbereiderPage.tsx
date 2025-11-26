import React, { useState } from 'react';
import ScenarioGrid from '../components/ScenarioGrid';
import BemalingsForm, { defaultForm } from '../components/BemalingsForm';
import PlanRightHub from '../components/PlanRightHub';
import type { BemalingsPlan } from '../types';
import type { ScenarioId } from '../lib/scenarioConfig';
import { applyScenarioDefaults } from '../lib/scenarioConfig';

const PlanvoorbereiderPage: React.FC = () => {
  const [scenario, setScenario] = useState<ScenarioId | null>(null);
  const [form, setForm] = useState<BemalingsPlan>(defaultForm);

  const handleScenarioSelect = (id: ScenarioId) => {
    setScenario(id);
    setForm(prev => applyScenarioDefaults(prev, id));
  };

  const handleFormUpdate = (updated: BemalingsPlan) => {
    setForm(updated);
  };

  const showForm = scenario !== null;

  return (
    <>
      {!showForm && <ScenarioGrid onSelect={handleScenarioSelect} />}

      {showForm && (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <BemalingsForm
              form={form}
              onUpdate={handleFormUpdate}
              selectedScenario={scenario}
            />
          </div>
          <PlanRightHub plan={form} />
        </div>
      )}
    </>
  );
};

export default PlanvoorbereiderPage;

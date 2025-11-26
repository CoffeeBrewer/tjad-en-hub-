import React from 'react';
import type { BemalingsPlan } from '../types';
import LivePreview from './LivePreview';
import FilterConfigurator from './FilterConfigurator';
import MapPreview from './MapPreview';
import HistoricalSuggestions from './HistoricalSuggestions';

interface Props {
  plan: BemalingsPlan;
}

const PlanRightHub: React.FC<Props> = ({ plan }) => {
  return (
    <aside className="plan-right-hub">
      <LivePreview data={plan} />
      <FilterConfigurator plan={plan} />
      <MapPreview plan={plan} />
      <HistoricalSuggestions plan={plan} />
    </aside>
  );
};

export default PlanRightHub;

import React from 'react';
import type { BemalingsPlan } from '../types';

interface Props {
  plan: BemalingsPlan;
}

const FilterConfigurator: React.FC<Props> = ({ plan }) => {
  const top = plan.filterBoven_mNAP ?? -1;
  const bottom = plan.filterOnder_mNAP ?? -5;
  const qws = plan.freatischeQws_mNAP ?? null;
  const ontgraving = plan.ontgravingsNiveau_mNAP ?? null;

  const max = 1;
  const min = -10;
  const norm = (v: number) => ((max - v) / (max - min)) * 100;

  const filterTopPos = norm(top);
  const filterBottomPos = norm(bottom);
  const filterHeight = Math.max(filterBottomPos - filterTopPos, 6);

  const qwsPos = qws != null ? norm(qws) : null;
  const ontgravingPos = ontgraving != null ? norm(ontgraving) : null;

  return (
    <div className="filter-config-card">
      <h4 className="preview-sub">Filterprofiel (schematisch)</h4>
      <div className="filter-profile">
        <div className="filter-axis">
          <div className="filter-axis-label">m NAP</div>
          <div className="filter-axis-line" />
        </div>

        <div className="filter-well">
          <div
            className="filter-block"
            style={{
              top: `${filterTopPos}%`,
              height: `${filterHeight}%`,
            }}
          >
            <span className="filter-block-label">
              {plan.filterStuks ?? '—'}x
            </span>
          </div>

          {qwsPos != null && (
            <div className="filter-line filter-line-qws" style={{ top: `${qwsPos}%` }}>
              <span>q.w.s.</span>
            </div>
          )}

          {ontgravingPos != null && (
            <div className="filter-line filter-line-dig" style={{ top: `${ontgravingPos}%` }}>
              <span>Ontgraving</span>
            </div>
          )}
        </div>
      </div>

      <p className="filter-caption">
        Bovenkant filter: {top} m NAP · Onderkant filter: {bottom} m NAP
      </p>
    </div>
  );
};

export default FilterConfigurator;

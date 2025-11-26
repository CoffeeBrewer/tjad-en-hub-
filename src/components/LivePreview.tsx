import React from 'react';
import type { BemalingsPlan } from '../types';

interface Props {
  data: BemalingsPlan;
}

const LivePreview: React.FC<Props> = ({ data }) => {
  const verlagingQws =
    data.freatischeQws_mNAP != null &&
    data.ontgravingsNiveau_mNAP != null
      ? (data.freatischeQws_mNAP - data.ontgravingsNiveau_mNAP).toFixed(2)
      : null;

  const verlagingStijg =
    data.stijghoogte_mNAP != null &&
    data.ontgravingsNiveau_mNAP != null
      ? (data.stijghoogte_mNAP - data.ontgravingsNiveau_mNAP).toFixed(2)
      : null;

  return (
    <aside className="preview-card">
      <h3 className="preview-title">Live overzicht</h3>

      <section className="preview-section">
        <h4 className="preview-sub">Project</h4>
        <p><strong>{data.projectNaam || '—'}</strong></p>
        <p>Nr: {data.projectNummer || '—'}</p>
        <p>{data.opdrachtgever || '—'}</p>
        <p className="preview-small">{data.werkadres || '—'}</p>
      </section>

      <section className="preview-section">
        <h4 className="preview-sub">Ontgraving</h4>
        <p>Type: {data.typeOntgraving || '—'}</p>
        <p>Wijze: {data.ontgravingsWijze || '—'}</p>
        <p>Niveau: {data.ontgravingsNiveau_mNAP ?? '—'} m NAP</p>

        <div className="preview-values">
          <div>
            <span className="pv-label">q.w.s.</span>
            <span>{data.freatischeQws_mNAP ?? '—'} m</span>
          </div>
          <div>
            <span className="pv-label">Stijgh.</span>
            <span>{data.stijghoogte_mNAP ?? '—'} m</span>
          </div>
        </div>

        {verlagingQws && (
          <p className="preview-accent">Δ q.w.s.: {verlagingQws} m</p>
        )}
        {verlagingStijg && (
          <p className="preview-accent">Δ stijgh.: {verlagingStijg} m</p>
        )}
      </section>

      <section className="preview-section">
        <h4 className="preview-sub">Bemaling</h4>
        <ul className="preview-tags">
          {data.bemManueelFtFilters && <li>Manueel FT</li>}
          {data.bemMachinaalFtFilters && <li>Machinaal FT</li>}
          {data.bemManueelOtoFilters && <li>Manueel OTO</li>}
          {data.bemMachinaalOtoFilters && <li>Machinaal OTO</li>}
          {data.bemDieptebronnen && <li>Dieptebronnen</li>}
          {data.bemRetourbronnen && <li>Retour</li>}
          {data.bemHorizontaleDrains && <li>Drains</li>}
        </ul>
        <p>Filters: {data.filterStuks ?? '—'} stuks</p>
        <p>
          Filterrange: {data.filterBoven_mNAP ?? '—'} → {data.filterOnder_mNAP ?? '—'} m NAP
        </p>
      </section>

      <section className="preview-section">
        <h4 className="preview-sub">Debiet &amp; Lozing</h4>
        <p>Fr. debiet: {data.frDebiet_m3u ?? '—'} m³/u</p>
        <p>Sp. debiet: {data.spDebiet_m3u ?? '—'} m³/u</p>
        <p>Lozing: {data.lozingspunt || '—'}</p>
      </section>

      <section className="preview-section">
        <h4 className="preview-sub">Planning</h4>
        <p>Start: {data.planningStartWeek || '—'}</p>
        <p>Duur: {data.planningDuurWeken ?? '—'} weken</p>
        <p>Installatie: {data.planningInstallatieWeek || '—'}</p>
        <p>Einde: {data.planningVerwijderenWeek || '—'}</p>
      </section>
    </aside>
  );
};

export default LivePreview;

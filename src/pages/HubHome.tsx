import React from 'react';
import { Link } from 'react-router-dom';

const HubHome: React.FC = () => {
  return (
    <div className="hub-grid-wrapper">
      <h2 className="hub-title">Tjaden Hub</h2>
      <p className="hub-subtitle">
        Centrale omgeving voor bemaling, bronnering en projectinformatie.
        Kies een module om te starten.
      </p>

      <div className="hub-grid">
        <Link to="/planvoorbereider" className="hub-tile">
          <div className="hub-tile-header">
            <span className="hub-tile-icon">📐</span>
            <span className="hub-tile-tag">Actief</span>
          </div>
          <div className="hub-tile-title">PlanVoorbereider</div>
          <div className="hub-tile-desc">
            Snel bemalingsplannen opstellen met scenario&apos;s, live preview en
            koppeling met SharePoint.
          </div>
          <div className="hub-tile-footer">Bemalingsplannen · Ontwerp</div>
        </Link>

        <Link to="/projecten" className="hub-tile hub-tile--disabled">
          <div className="hub-tile-header">
            <span className="hub-tile-icon">📁</span>
            <span className="hub-tile-tag hub-tile-tag--soon">Binnenkort</span>
          </div>
          <div className="hub-tile-title">Projecten &amp; Historie</div>
          <div className="hub-tile-desc">
            Zoeken in eerdere bemalingsplannen, debieten en configuraties. Start
            een nieuw plan op basis van een bestaand project.
          </div>
          <div className="hub-tile-footer">Archief · Analyse</div>
        </Link>

        <div className="hub-tile hub-tile--ghost">
          <div className="hub-tile-header">
            <span className="hub-tile-icon">📊</span>
            <span className="hub-tile-tag hub-tile-tag--soon">Concept</span>
          </div>
          <div className="hub-tile-title">Monitoring &amp; Rapportage</div>
          <div className="hub-tile-desc">
            Koppeling met peilbuizen, grondwaterstanden en automatische
            rapportages tijdens de bemaling.
          </div>
          <div className="hub-tile-footer">Data · Grondwater</div>
        </div>

        <div className="hub-tile hub-tile--ghost">
          <div className="hub-tile-header">
            <span className="hub-tile-icon">📚</span>
            <span className="hub-tile-tag hub-tile-tag--soon">Concept</span>
          </div>
          <div className="hub-tile-title">Bibliotheek &amp; Templates</div>
          <div className="hub-tile-desc">
            Standaard teksten, methodieken en configuraties voor verschillende
            bemalingssituaties.
          </div>
          <div className="hub-tile-footer">Kennis · Templates</div>
        </div>
      </div>
    </div>
  );
};

export default HubHome;

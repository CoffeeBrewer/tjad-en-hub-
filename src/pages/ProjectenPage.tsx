import React from 'react';
import { Link } from 'react-router-dom';

const ProjectenPage: React.FC = () => {
  return (
    <div className="tab-panel">
      <h2 style={{ marginTop: 0 }}>Projecten &amp; Historie</h2>
      <p className="text-muted">
        Deze module wordt later gevuld met historische bemalingsplannen,
        zoekfunctionaliteit en analytics op basis van SharePoint-data.
      </p>
      <p className="text-muted">
        Voor nu kun je bemalingsplannen opstellen via de module{' '}
        <Link to="/planvoorbereider">PlanVoorbereider</Link>.
      </p>
    </div>
  );
};

export default ProjectenPage;

import React from 'react';
import type { BemalingsPlan } from '../types';

interface Props {
  plan: BemalingsPlan;
}

const MapPreview: React.FC<Props> = ({ plan }) => {
  const lat = Number(plan.yCoordinaat);
  const lon = Number(plan.xCoordinaat);
  const valid = !Number.isNaN(lat) && !Number.isNaN(lon);

  const staticMapUrl = valid
    ? `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=16&size=320x200&markers=${lat},${lon},lightblue1`
    : null;

  return (
    <div className="map-preview-card">
      <h4 className="preview-sub">Kaartlocatie</h4>
      {!valid && (
        <p className="preview-small">
          Vul geldige X/Y-coördinaten in om een kaartbeeld te tonen.
        </p>
      )}
      {valid && staticMapUrl && (
        <>
          <img
            src={staticMapUrl}
            alt="Projectlocatie kaart"
            className="map-preview-image"
          />
          <p className="preview-small">
            Locatie: {lat.toFixed(5)}, {lon.toFixed(5)} (indicatief)
          </p>
        </>
      )}
    </div>
  );
};

export default MapPreview;

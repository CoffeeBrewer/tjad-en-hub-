import React, { useState } from 'react';
import type { BemalingsPlan } from '../types';
import type { ScenarioId } from '../lib/scenarioConfig';

export const defaultForm: BemalingsPlan = {
  // ALGEMEEN
  projectNaam: '',
  opdrachtgever: '',
  projectNummer: '',
  datum: '',
  versie: '',
  status: '',
  documentNummer: '',
  referentieKlant: '',

  // CONTACT
  projectleider: '',
  uitvoerder: '',
  wvb: '',

  // LOCATIE
  werkadres: '',
  xCoordinaat: '',
  yCoordinaat: '',
  hoogtestelsel: '',
  waterschap: '',

  // BODEM
  bodemL1Boven_mNAP: null,
  bodemL1Omschrijving: '',
  bodemL2Boven_mNAP: null,
  bodemL2Omschrijving: '',
  bodemL3Boven_mNAP: null,
  bodemL3Omschrijving: '',
  bodemL4Boven_mNAP: null,
  bodemL4Omschrijving: '',
  bodemL5Boven_mNAP: null,
  bodemL5Omschrijving: '',

  // UITGANGSPUNTEN
  typeOntgraving: '',
  ontgravingsWijze: '',
  afmetingen: '',
  freatischeQws_mNAP: null,
  stijghoogte_mNAP: null,
  ontgravingsNiveau_mNAP: null,
  verlagingQws_m: null,
  verlagingStijgh_m: null,
  frDebiet_m3u: null,
  spDebiet_m3u: null,
  lozingspunt: '',
  aantalPompen: null,
  energieVoorziening_kWkVA: '',
  grondwaterKwaliteit: '',
  overigeRisicos: '',

  // BEMALING
  bemManueelFtFilters: false,
  bemMachinaalFtFilters: false,
  bemManueelOtoFilters: false,
  bemMachinaalOtoFilters: false,
  bemDieptebronnen: false,
  bemRetourbronnen: false,
  bemHorizontaleDrains: false,

  filterStuks: null,
  filterBoven_mNAP: null,
  filterBoven_mmv: null,
  filterOnder_mNAP: null,
  filterOnder_mmv: null,

  // MONITORING
  monitoringStaalnamePakket: '',
  monitoringStaalnameFrequentie: '',
  monitoringPeilbuizenDoorTjaden: '',
  monitoringMethode: '',

  // PLANNING
  planningIndienenWeek: '',
  planningInstallatieWeek: '',
  planningStartWeek: '',
  planningDuurWeken: null,
  planningVerwijderenWeek: '',

  // META
  metaVersie: 'v001',
  metaDatum: '',
  metaAuteur: '',
};

type TabId = 'algemeen' | 'bodem' | 'uitgang' | 'bemaling' | 'planning';

interface BemalingsFormProps {
  form: BemalingsPlan;
  onUpdate: (f: BemalingsPlan) => void;
  selectedScenario: ScenarioId | null;
}

const REQUIRED_FIELDS: (keyof BemalingsPlan)[] = [
  'projectNaam',
  'opdrachtgever',
  'projectNummer',
  'datum',
  'werkadres',
  'typeOntgraving',
  'ontgravingsWijze',
  'ontgravingsNiveau_mNAP',
  'frDebiet_m3u',
  'lozingspunt',
  'planningStartWeek',
];

function computeProgress(form: BemalingsPlan): number {
  const total = REQUIRED_FIELDS.length;
  const filled = REQUIRED_FIELDS.filter(key => {
    const v = form[key];
    if (typeof v === 'string') return v.trim() !== '';
    if (typeof v === 'number') return !Number.isNaN(v);
    if (typeof v === 'boolean') return v;
    return v != null;
  }).length;

  return total === 0 ? 0 : Math.round((filled / total) * 100);
}

const BemalingsForm: React.FC<BemalingsFormProps> = ({
  form,
  onUpdate,
  selectedScenario,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('algemeen');

  const progress = computeProgress(form);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target;

    onUpdate({
      ...form,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? value === '' ? null : Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await submitToSharePoint(form);
      setSuccessMsg('Bemalingsplan succesvol verzonden naar SharePoint 👍');
    } catch (err) {
      console.error(err);
      setErrorMsg('Er ging iets mis bij het verzenden naar SharePoint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const TabButton: React.FC<{ id: TabId; label: string }> = ({ id, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={'tab-btn ' + (activeTab === id ? 'tab-btn--active' : '')}
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* STICKY TOPBAR MET PROGRESS + TABS */}
      <div className="sticky-top">
        <div className="progress-strip">
          <div className="progress-meta">
            <span className="progress-label">Voortgang bemalingsplan</span>
            <span className="progress-perc">{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          {selectedScenario && (
            <div className="text-muted mt-sm">
              Scenario: <strong>{selectedScenario}</strong>
            </div>
          )}
        </div>

        <div className="tab-bar">
          <TabButton id="algemeen" label="Algemene info" />
          <TabButton id="bodem" label="Bodemopbouw" />
          <TabButton id="uitgang" label="Uitgangspunten" />
          <TabButton id="bemaling" label="Bemaling & monitoring" />
          <TabButton id="planning" label="Planning & meta" />
        </div>
      </div>

      <div className="tab-panel">
        {activeTab === 'algemeen' && (
          <AlgemeenTab form={form} onChange={handleChange} />
        )}
        {activeTab === 'bodem' && (
          <BodemTab form={form} onChange={handleChange} />
        )}
        {activeTab === 'uitgang' && (
          <UitgangspuntenTab form={form} onChange={handleChange} />
        )}
        {activeTab === 'bemaling' && (
          <BemalingTab form={form} onChange={handleChange} />
        )}
        {activeTab === 'planning' && (
          <PlanningTab form={form} onChange={handleChange} />
        )}
      </div>

      <div className="form-footer">
        <div className="status-msg">
          {errorMsg && <span className="status-msg status-msg--error">{errorMsg}</span>}
          {successMsg && (
            <span className="status-msg status-msg--success">{successMsg}</span>
          )}
        </div>

        <button className="submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Verzenden…' : 'Genereer werkplan'}
        </button>
      </div>
    </form>
  );
};

export default BemalingsForm;

interface TabProps {
  form: BemalingsPlan;
  onChange: (e: React.ChangeEvent<any>) => void;
}

/* ---- TAB COMPONENTEN ---- */

const AlgemeenTab: React.FC<TabProps> = ({ form, onChange }) => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <fieldset>
      <legend><strong>Algemene informatie</strong></legend>
      <div className="field-grid-2">
        <label>
          Projectnaam
          <input name="projectNaam" value={form.projectNaam} onChange={onChange} />
        </label>
        <label>
          Opdrachtgever
          <input
            name="opdrachtgever"
            value={form.opdrachtgever}
            onChange={onChange}
          />
        </label>
        <label>
          Projectnummer
          <input
            name="projectNummer"
            value={form.projectNummer}
            onChange={onChange}
          />
        </label>
        <label>
          Datum
          <input type="date" name="datum" value={form.datum} onChange={onChange} />
        </label>
        <label>
          Versie
          <input name="versie" value={form.versie} onChange={onChange} />
        </label>
        <label>
          Status
          <input name="status" value={form.status} onChange={onChange} />
        </label>
        <label>
          Documentnummer
          <input
            name="documentNummer"
            value={form.documentNummer}
            onChange={onChange}
          />
        </label>
        <label>
          Referentie klant
          <input
            name="referentieKlant"
            value={form.referentieKlant}
            onChange={onChange}
          />
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend><strong>Contactpersonen Tjaden</strong></legend>
      <div className="field-grid-3">
        <label>
          Projectleider
          <input
            name="projectleider"
            value={form.projectleider}
            onChange={onChange}
          />
        </label>
        <label>
          Uitvoerder
          <input name="uitvoerder" value={form.uitvoerder} onChange={onChange} />
        </label>
        <label>
          W.V.B.
          <input name="wvb" value={form.wvb} onChange={onChange} />
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend><strong>Locatiegegevens</strong></legend>
      <div className="field-grid-2">
        <label>
          Werkadres
          <input name="werkadres" value={form.werkadres} onChange={onChange} />
        </label>
        <label>
          X-coördinaat
          <input
            name="xCoordinaat"
            value={form.xCoordinaat}
            onChange={onChange}
          />
        </label>
        <label>
          Y-coördinaat
          <input
            name="yCoordinaat"
            value={form.yCoordinaat}
            onChange={onChange}
          />
        </label>
        <label>
          Hoogtestelsel
          <input
            name="hoogtestelsel"
            value={form.hoogtestelsel}
            onChange={onChange}
          />
        </label>
        <label>
          Waterschap
          <input name="waterschap" value={form.waterschap} onChange={onChange} />
        </label>
      </div>
    </fieldset>
  </div>
);

const BodemTab: React.FC<TabProps> = ({ form, onChange }) => (
  <fieldset>
    <legend><strong>Bodemopbouw</strong></legend>
    <table className="bodem-table">
      <thead>
        <tr>
          <th>Laag</th>
          <th>Bovenkant per laag (m NAP)</th>
          <th>Beschrijving bodemopbouw</th>
        </tr>
      </thead>
      <tbody>
        {(['1', '2', '3', '4', '5'] as const).map(n => (
          <tr key={n}>
            <td>{`L${n}`}</td>
            <td>
              <input
                type="number"
                name={`bodemL${n}Boven_mNAP`}
                value={(form as any)[`bodemL${n}Boven_mNAP`] ?? ''}
                onChange={onChange}
                step={0.1}
              />
            </td>
            <td>
              <input
                name={`bodemL${n}Omschrijving`}
                value={(form as any)[`bodemL${n}Omschrijving`] ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </fieldset>
);

const UitgangspuntenTab: React.FC<TabProps> = ({ form, onChange }) => {
  const heeftQwsEnOntgraving =
    form.freatischeQws_mNAP != null && form.ontgravingsNiveau_mNAP != null;
  const autoVerlagingQws =
    heeftQwsEnOntgraving
      ? form.freatischeQws_mNAP! - form.ontgravingsNiveau_mNAP!
      : null;

  const heeftStijgEnOntgraving =
    form.stijghoogte_mNAP != null && form.ontgravingsNiveau_mNAP != null;
  const autoVerlagingStijg =
    heeftStijgEnOntgraving
      ? form.stijghoogte_mNAP! - form.ontgravingsNiveau_mNAP!
      : null;

  const diepteWarning =
    heeftQwsEnOntgraving &&
    form.ontgravingsNiveau_mNAP! < form.freatischeQws_mNAP! - 2;

  return (
    <fieldset>
      <legend><strong>Uitgangspunten</strong></legend>
      <div className="field-grid-2">
        <label>
          Type ontgraving
          <select
            name="typeOntgraving"
            value={form.typeOntgraving}
            onChange={onChange}
          >
            <option value="">-- kies --</option>
            <option value="sleuf">Sleuf</option>
            <option value="bouwkuip">Bouwkuip</option>
          </select>
        </label>

        <label>
          Ontgravingswijze
          <select
            name="ontgravingsWijze"
            value={form.ontgravingsWijze}
            onChange={onChange}
          >
            <option value="">-- kies --</option>
            <option value="talud">Talud</option>
            <option value="damwanden">Damwanden</option>
          </select>
        </label>

        <label>
          Afmetingen (lengte × breedte)
          <input name="afmetingen" value={form.afmetingen} onChange={onChange} />
        </label>

        <label>
          Freatische q.w.s. (m NAP)
          <input
            type="number"
            name="freatischeQws_mNAP"
            value={form.freatischeQws_mNAP ?? ''}
            onChange={onChange}
            step={0.1}
          />
        </label>

        <label>
          Stijghoogte (m NAP)
          <input
            type="number"
            name="stijghoogte_mNAP"
            value={form.stijghoogte_mNAP ?? ''}
            onChange={onChange}
            step={0.1}
          />
        </label>

        <label>
          Ontgravingsniveau (m NAP)
          <input
            type="number"
            name="ontgravingsNiveau_mNAP"
            value={form.ontgravingsNiveau_mNAP ?? ''}
            onChange={onChange}
            step={0.1}
          />
          {diepteWarning && (
            <span className="helper-pill helper-pill--warn mt-sm">
              Let op: grote verlaging t.o.v. q.w.s.
            </span>
          )}
        </label>

        <label>
          Verlaging freatische q.w.s. (m)
          <div className="with-helper">
            <input
              type="number"
              name="verlagingQws_m"
              value={form.verlagingQws_m ?? ''}
              onChange={onChange}
              step={0.1}
            />
            {autoVerlagingQws != null && (
              <span className="helper-pill">
                Suggestie: {autoVerlagingQws.toFixed(2)} m
              </span>
            )}
          </div>
        </label>

        <label>
          Verlaging stijghoogte (m)
          <div className="with-helper">
            <input
              type="number"
              name="verlagingStijgh_m"
              value={form.verlagingStijgh_m ?? ''}
              onChange={onChange}
              step={0.1}
            />
            {autoVerlagingStijg != null && (
              <span className="helper-pill">
                Suggestie: {autoVerlagingStijg.toFixed(2)} m
              </span>
            )}
          </div>
        </label>

        <label>
          Fr. debiet (m³/uur)
          <input
            type="number"
            name="frDebiet_m3u"
            value={form.frDebiet_m3u ?? ''}
            onChange={onChange}
          />
        </label>

        <label>
          Sp. debiet (m³/uur)
          <input
            type="number"
            name="spDebiet_m3u"
            value={form.spDebiet_m3u ?? ''}
            onChange={onChange}
          />
        </label>

        <label>
          Lozingspunt
          <input name="lozingspunt" value={form.lozingspunt} onChange={onChange} />
        </label>

        <label>
          Aantal pompen
          <input
            type="number"
            name="aantalPompen"
            value={form.aantalPompen ?? ''}
            onChange={onChange}
          />
        </label>

        <label>
          Energievoorziening (kW/kVA)
          <input
            name="energieVoorziening_kWkVA"
            value={form.energieVoorziening_kWkVA}
            onChange={onChange}
          />
        </label>

        <label>
          Grondwaterkwaliteit
          <textarea
            name="grondwaterKwaliteit"
            value={form.grondwaterKwaliteit}
            onChange={onChange}
            rows={2}
          />
        </label>

        <label>
          Overige risico&apos;s
          <textarea
            name="overigeRisicos"
            value={form.overigeRisicos}
            onChange={onChange}
            rows={2}
          />
        </label>
      </div>
    </fieldset>
  );
};

const BemalingTab: React.FC<TabProps> = ({ form, onChange }) => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <fieldset>
      <legend><strong>Bemalingsmethode</strong></legend>
      <div className="field-grid-2">
        <div className="checkbox-row">
          <label>
            <input
              type="checkbox"
              name="bemManueelFtFilters"
              checked={form.bemManueelFtFilters}
              onChange={onChange}
            />{' '}
            Manueel ft. filters
          </label>
          <label>
            <input
              type="checkbox"
              name="bemMachinaalFtFilters"
              checked={form.bemMachinaalFtFilters}
              onChange={onChange}
            />{' '}
            Machinaal ft. filters
          </label>
          <label>
            <input
              type="checkbox"
              name="bemManueelOtoFilters"
              checked={form.bemManueelOtoFilters}
              onChange={onChange}
            />{' '}
            Manueel OTO filters
          </label>
          <label>
            <input
              type="checkbox"
              name="bemMachinaalOtoFilters"
              checked={form.bemMachinaalOtoFilters}
              onChange={onChange}
            />{' '}
            Machinaal OTO filters
          </label>
          <label>
            <input
              type="checkbox"
              name="bemDieptebronnen"
              checked={form.bemDieptebronnen}
              onChange={onChange}
            />{' '}
            Dieptebronnen
          </label>
          <label>
            <input
              type="checkbox"
              name="bemRetourbronnen"
              checked={form.bemRetourbronnen}
              onChange={onChange}
            />{' '}
            Retourbronnen
          </label>
          <label>
            <input
              type="checkbox"
              name="bemHorizontaleDrains"
              checked={form.bemHorizontaleDrains}
              onChange={onChange}
            />{' '}
            Horizontale drains
          </label>
        </div>

        <div>
          <p><strong>Filterconfiguratie</strong></p>
          <label>
            Stuks
            <input
              type="number"
              name="filterStuks"
              value={form.filterStuks ?? ''}
              onChange={onChange}
            />
          </label>
          <label>
            Bovenkant filter (m NAP)
            <input
              type="number"
              name="filterBoven_mNAP"
              value={form.filterBoven_mNAP ?? ''}
              onChange={onChange}
              step={0.1}
            />
          </label>
          <label>
            Bovenkant filter (m-mv)
            <input
              type="number"
              name="filterBoven_mmv"
              value={form.filterBoven_mmv ?? ''}
              onChange={onChange}
              step={0.1}
            />
          </label>
          <label>
            Onderkant filter (m NAP)
            <input
              type="number"
              name="filterOnder_mNAP"
              value={form.filterOnder_mNAP ?? ''}
              onChange={onChange}
              step={0.1}
            />
          </label>
          <label>
            Onderkant filter (m-mv)
            <input
              type="number"
              name="filterOnder_mmv"
              value={form.filterOnder_mmv ?? ''}
              onChange={onChange}
              step={0.1}
            />
          </label>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend><strong>Monitoring</strong></legend>
      <div className="field-grid-2">
        <label>
          Staalnamepakket
          <input
            name="monitoringStaalnamePakket"
            value={form.monitoringStaalnamePakket}
            onChange={onChange}
          />
        </label>
        <label>
          Staalname frequentie
          <input
            name="monitoringStaalnameFrequentie"
            value={form.monitoringStaalnameFrequentie}
            onChange={onChange}
          />
        </label>
        <label>
          Peilbuizen door Tjaden
          <input
            name="monitoringPeilbuizenDoorTjaden"
            value={form.monitoringPeilbuizenDoorTjaden}
            onChange={onChange}
          />
        </label>
        <label>
          Monitoringmethode
          <input
            name="monitoringMethode"
            value={form.monitoringMethode}
            onChange={onChange}
          />
        </label>
      </div>
    </fieldset>
  </div>
);

const PlanningTab: React.FC<TabProps> = ({ form, onChange }) => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <fieldset>
      <legend><strong>Planning</strong></legend>
      <div className="field-grid-2">
        <label>
          Indienen bemalingsplan (weeknr - jaartal)
          <input
            name="planningIndienenWeek"
            value={form.planningIndienenWeek}
            onChange={onChange}
          />
        </label>
        <label>
          Installatie bemaling (weeknr - jaartal)
          <input
            name="planningInstallatieWeek"
            value={form.planningInstallatieWeek}
            onChange={onChange}
          />
        </label>
        <label>
          Start bemaling (weeknr - jaartal)
          <input
            name="planningStartWeek"
            value={form.planningStartWeek}
            onChange={onChange}
          />
        </label>
        <label>
          Bemalingsduur (weken)
          <input
            type="number"
            name="planningDuurWeken"
            value={form.planningDuurWeken ?? ''}
            onChange={onChange}
          />
        </label>
        <label>
          Verwijderen bemaling (weeknr - jaartal)
          <input
            name="planningVerwijderenWeek"
            value={form.planningVerwijderenWeek}
            onChange={onChange}
          />
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend><strong>Meta / versie-informatie</strong></legend>
      <div className="field-grid-3">
        <label>
          Versie
          <input name="metaVersie" value={form.metaVersie} onChange={onChange} />
        </label>
        <label>
          Datum
          <input
            type="date"
            name="metaDatum"
            value={form.metaDatum}
            onChange={onChange}
          />
        </label>
        <label>
          Auteur
          <input name="metaAuteur" value={form.metaAuteur} onChange={onChange} />
        </label>
      </div>
    </fieldset>
  </div>
);

/* placeholder – later vervang je dit door echte SharePoint integratie */
async function submitToSharePoint(_data: BemalingsPlan): Promise<void> {
  // console.log('DATA NAAR SHAREPOINT (placeholder):', _data);
  await new Promise(res => setTimeout(res, 500));
}

import type { BemalingsPlan } from '../types';

export type ScenarioId =
  | 'sleuf_klein'
  | 'sleuf_groot'
  | 'bouwkuip_stedelijk'
  | 'bouwkuip_damwand'
  | 'deepwell'
  | 'retourbemaling'
  | 'kelderbouw'
  | 'sanering';

export interface ScenarioDef {
  id: ScenarioId;
  label: string;
  short: string;
  description: string;
  icon: string;
}

export const SCENARIOS: ScenarioDef[] = [
  {
    id: 'sleuf_klein',
    label: 'Sleufbemaling klein',
    short: 'Sleuf &lt; 3 m',
    description: 'Kleine sleufbemaling voor leidingen/kabels in open grond.',
    icon: '〰️',
  },
  {
    id: 'sleuf_groot',
    label: 'Sleufbemaling groot',
    short: 'Sleuf &gt; 3 m',
    description: 'Langere of diepere sleuven met verhoogd debiet.',
    icon: '📏',
  },
  {
    id: 'bouwkuip_stedelijk',
    label: 'Bouwkuip binnenstedelijk',
    short: 'Stedelijke kuip',
    description: 'Complexe omgeving, gevoelig voor zettingen en omgeving.',
    icon: '🏙️',
  },
  {
    id: 'bouwkuip_damwand',
    label: 'Bouwkuip met damwanden',
    short: 'Damwand',
    description: 'Bouwkuip met stalen damwanden / combiwand.',
    icon: '🧱',
  },
  {
    id: 'deepwell',
    label: 'Deepwell bemaling',
    short: 'Deepwell',
    description: 'Diepe bemaling met één of meerdere deepwells.',
    icon: '🕳️',
  },
  {
    id: 'retourbemaling',
    label: 'Retourbemaling',
    short: 'Retour',
    description: 'Bemaling met retourbronnen / infiltratie.',
    icon: '🔁',
  },
  {
    id: 'kelderbouw',
    label: 'Kelder / souterrain',
    short: 'Kelder',
    description: 'Uitgraven van kelder of souterrain in bebouwd gebied.',
    icon: '🏗️',
  },
  {
    id: 'sanering',
    label: 'Saneringsbemaling',
    short: 'Sanering',
    description: 'Grond-/grondwatersanering met bemaling en zuivering.',
    icon: '🧪',
  },
];

export function applyScenarioDefaults(
  base: BemalingsPlan,
  scenario: ScenarioId,
): BemalingsPlan {
  const f: BemalingsPlan = { ...base };

  switch (scenario) {
    case 'sleuf_klein':
      f.typeOntgraving = 'sleuf';
      f.ontgravingsWijze = 'talud';
      f.bemManueelFtFilters = true;
      f.bemMachinaalFtFilters = false;
      f.bemDieptebronnen = false;
      f.bemHorizontaleDrains = false;
      f.aantalPompen = f.aantalPompen ?? 1;
      f.frDebiet_m3u = f.frDebiet_m3u ?? 10;
      break;

    case 'sleuf_groot':
      f.typeOntgraving = 'sleuf';
      f.ontgravingsWijze = 'talud';
      f.bemManueelFtFilters = false;
      f.bemMachinaalFtFilters = true;
      f.aantalPompen = f.aantalPompen ?? 2;
      f.frDebiet_m3u = f.frDebiet_m3u ?? 25;
      break;

    case 'bouwkuip_stedelijk':
      f.typeOntgraving = 'bouwkuip';
      f.ontgravingsWijze = 'damwanden';
      f.bemMachinaalOtoFilters = true;
      f.bemRetourbronnen = true;
      f.bemHorizontaleDrains = false;
      f.aantalPompen = f.aantalPompen ?? 3;
      break;

    case 'bouwkuip_damwand':
      f.typeOntgraving = 'bouwkuip';
      f.ontgravingsWijze = 'damwanden';
      f.bemMachinaalFtFilters = true;
      f.bemManueelFtFilters = false;
      f.bemDieptebronnen = false;
      break;

    case 'deepwell':
      f.typeOntgraving = 'bouwkuip';
      f.bemDieptebronnen = true;
      f.bemMachinaalFtFilters = false;
      f.bemMachinaalOtoFilters = false;
      f.frDebiet_m3u = f.frDebiet_m3u ?? 40;
      break;

    case 'retourbemaling':
      f.bemRetourbronnen = true;
      f.lozingspunt = f.lozingspunt || 'Retour / infiltratie';
      break;

    case 'kelderbouw':
      f.typeOntgraving = 'bouwkuip';
      f.ontgravingsWijze = 'damwanden';
      f.bemMachinaalFtFilters = true;
      break;

    case 'sanering':
      f.grondwaterKwaliteit = f.grondwaterKwaliteit || 'Verontreinigd (sanering)';
      f.monitoringStaalnamePakket =
        f.monitoringStaalnamePakket || 'Saneringspakket';
      f.monitoringStaalnameFrequentie =
        f.monitoringStaalnameFrequentie || 'Conform saneringsplan';
      break;
  }

  return f;
}

export interface BemalingsPlan {
  // ALGEMENE INFO
  projectNaam: string;
  opdrachtgever: string;
  projectNummer: string;
  datum: string; // yyyy-mm-dd
  versie: string;
  status: string;
  documentNummer: string;
  referentieKlant: string;

  // CONTACTPERSONEN TJADEN
  projectleider: string;
  uitvoerder: string;
  wvb: string;

  // LOCATIEGEGEVENS
  werkadres: string;
  xCoordinaat: string;
  yCoordinaat: string;
  hoogtestelsel: string;
  waterschap: string;

  // BODEMOPBOUW L1–L5
  bodemL1Boven_mNAP: number | null;
  bodemL1Omschrijving: string;
  bodemL2Boven_mNAP: number | null;
  bodemL2Omschrijving: string;
  bodemL3Boven_mNAP: number | null;
  bodemL3Omschrijving: string;
  bodemL4Boven_mNAP: number | null;
  bodemL4Omschrijving: string;
  bodemL5Boven_mNAP: number | null;
  bodemL5Omschrijving: string;

  // UITGANGSPUNTEN
  typeOntgraving: string;
  ontgravingsWijze: string;
  afmetingen: string;
  freatischeQws_mNAP: number | null;
  stijghoogte_mNAP: number | null;
  ontgravingsNiveau_mNAP: number | null;
  verlagingQws_m: number | null;
  verlagingStijgh_m: number | null;
  frDebiet_m3u: number | null;
  spDebiet_m3u: number | null;
  lozingspunt: string;
  aantalPompen: number | null;
  energieVoorziening_kWkVA: string;
  grondwaterKwaliteit: string;
  overigeRisicos: string;

  // BEMALINGSMETHODE
  bemManueelFtFilters: boolean;
  bemMachinaalFtFilters: boolean;
  bemManueelOtoFilters: boolean;
  bemMachinaalOtoFilters: boolean;
  bemDieptebronnen: boolean;
  bemRetourbronnen: boolean;
  bemHorizontaleDrains: boolean;

  filterStuks: number | null;
  filterBoven_mNAP: number | null;
  filterBoven_mmv: number | null;
  filterOnder_mNAP: number | null;
  filterOnder_mmv: number | null;

  // MONITORING
  monitoringStaalnamePakket: string;
  monitoringStaalnameFrequentie: string;
  monitoringPeilbuizenDoorTjaden: string;
  monitoringMethode: string;

  // PLANNING
  planningIndienenWeek: string;
  planningInstallatieWeek: string;
  planningStartWeek: string;
  planningDuurWeken: number | null;
  planningVerwijderenWeek: string;

  // META
  metaVersie: string;
  metaDatum: string;
  metaAuteur: string;
}

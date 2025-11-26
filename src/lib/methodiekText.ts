import type { BemalingsPlan } from '../types';

export function generateMethodiekText(plan: BemalingsPlan): string {
  const lines: string[] = [];

  lines.push(
    `Voor het project "${plan.projectNaam || 'onbekend project'}" te ${
      plan.werkadres || 'onbekende locatie'
    } wordt een tijdelijke grondwaterbemaling ontworpen en gerealiseerd door Tjaden B.V.`,
  );

  if (plan.typeOntgraving === 'sleuf') {
    lines.push(
      `De werkzaamheden bestaan uit het ontgraven van een sleuf, welke wordt uitgevoerd als ${
        plan.ontgravingsWijze || 'open ontgraving'
      }. Het ontgravingsniveau bedraagt circa ${
        plan.ontgravingsNiveau_mNAP ?? '...'
      } m NAP.`,
    );
  } else if (plan.typeOntgraving === 'bouwkuip') {
    lines.push(
      `De werkzaamheden bestaan uit het realiseren van een bouwkuip, welke wordt ontgraven tot circa ${
        plan.ontgravingsNiveau_mNAP ?? '...'
      } m NAP. De kuiprand wordt uitgevoerd met ${
        plan.ontgravingsWijze || 'passende kuipwanden'
      }.`,
    );
  }

  if (plan.freatischeQws_mNAP != null) {
    lines.push(
      `De freatische grondwaterstand is bepaald op circa ${plan.freatischeQws_mNAP.toFixed(
        2,
      )} m NAP.`,
    );
  }
  if (plan.verlagingQws_m != null) {
    lines.push(
      `Ten behoeve van de ontgraving is een verlaging van de freatische grondwaterstand van circa ${plan.verlagingQws_m.toFixed(
        2,
      )} m benodigd.`,
    );
  }

  const methodes: string[] = [];
  if (plan.bemManueelFtFilters || plan.bemMachinaalFtFilters)
    methodes.push('filterbemaling');
  if (plan.bemManueelOtoFilters || plan.bemMachinaalOtoFilters)
    methodes.push('open bemaling (OTO)');
  if (plan.bemDieptebronnen) methodes.push('deepwellbemaling');
  if (plan.bemHorizontaleDrains) methodes.push('horizontale drains');
  if (plan.bemRetourbronnen) methodes.push('retourbemaling');

  if (methodes.length > 0) {
    lines.push(
      `Als bemalingsmethodiek wordt gebruikgemaakt van ${methodes.join(
        ', ',
      )}. De definitieve configuratie wordt afgestemd op de lokale bodemopbouw en de uitvoering.`,
    );
  }

  if (
    plan.filterStuks != null &&
    plan.filterBoven_mNAP != null &&
    plan.filterOnder_mNAP != null
  ) {
    lines.push(
      `De bemaling wordt gerealiseerd met circa ${plan.filterStuks} filters, met een filtertraject van circa ${plan.filterBoven_mNAP.toFixed(
        2,
      )} tot ${plan.filterOnder_mNAP.toFixed(2)} m NAP.`,
    );
  }
  if (plan.frDebiet_m3u != null) {
    lines.push(
      `Het ontwerpdebiet van de bemaling bedraagt circa ${plan.frDebiet_m3u.toFixed(
        1,
      )} m³/uur, exclusief eventuele piekbelasting.`,
    );
  }

  if (plan.lozingspunt) {
    lines.push(
      `Het onttrokken grondwater wordt geloosd op ${plan.lozingspunt}. Hiervoor worden de betreffende beheerders tijdig geïnformeerd en waar nodig vergunningen/ontheffingen aangevraagd.`,
    );
  }

  if (plan.monitoringMethode || plan.monitoringPeilbuizenDoorTjaden) {
    lines.push(
      `Ten behoeve van de monitoring van de bemaling worden ${
        plan.monitoringPeilbuizenDoorTjaden || 'de benodigde peilbuizen'
      } ingezet. De grondwaterstanden worden gemonitord volgens ${
        plan.monitoringMethode || 'een nader te bepalen meetstrategie'
      }.`,
    );
  }

  return lines.join('\n\n');
}

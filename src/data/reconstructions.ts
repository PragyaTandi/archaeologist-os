import type { ReconstructionTech } from './types';

export const reconstructionTechs: ReconstructionTech[] = [
  {
    id: 'antikythera',
    name: 'Antikythera Mechanism',
    overview:
      'A hand-driven bronze gear computer predicting solar and lunar eclipses. Reconstruction requires a kinematic model of at least 30 gears cut to the recovered tooth counts.',
    methods: [
      'Lost-wax casting of bronze gear blanks',
      'Hand filing of gear teeth to exact tooth counts',
      'Pin-and-slot mechanism for lunar anomaly',
      'Engraving of Saros and Metonic spiral scales',
    ],
    materials: [
      { name: 'Bronze (Cu-Sn 8–10%)', spec: 'sheet 1.5 mm', note: 'Recovered fragments were low-tin bronze.' },
      { name: 'Wood frame', spec: 'oak / boxwood', note: 'No wood survived; inferred from corrosion traces.' },
      { name: 'Iron pins', spec: '1–2 mm wire', note: 'Used as pivots for the pin-and-slot.' },
      { name: 'Ink / Niello', spec: '—', note: 'Inscriptions filled with niello for contrast.' },
    ],
    principles: [
      'Differential gear train sums solar and lunar motion to yield the phase of the Moon.',
      'A pin offset from a gear centre sliding in a slot modulates lunar angular speed — the first known mechanical anomaly correction.',
      'The 223-tooth Solar Year gear provides the base period for the Saros eclipse dial.',
    ],
    components: [
      { id: 'c1', name: 'Main drive gear (b1)', role: 'Hand crank input, 223 teeth', material: 'Bronze', status: 'Complete' },
      { id: 'c2', name: 'Mean Sun gear', role: '365-day annual index', material: 'Bronze', status: 'Complete' },
      { id: 'c3', name: 'Moon pin-and-slot', role: 'Lunar anomaly correction', material: 'Bronze + Iron', status: 'Complete' },
      { id: 'c4', name: 'Metonic gear train', role: '235 lunar months in 19 years', material: 'Bronze', status: 'Complete' },
      { id: 'c5', name: 'Saros spiral dial', role: 'Eclipse prediction over 18 years', material: 'Bronze + Niello', status: 'In Progress' },
      { id: 'c6', name: 'Calendar plate', role: 'Egyptian 365-day front dial', material: 'Bronze', status: 'In Progress' },
      { id: 'c7', name: 'Planet indicators', role: 'Mars, Venus, Saturn pointers (inferred)', material: 'Bronze', status: 'Hypothetical' },
    ],
    buildSteps: [
      'Cast and file the 223-tooth drive gear; verify against the recovered tooth counts.',
      'Assemble the mean Sun and Moon gear train on the main plate.',
      'Install the pin-and-slot mechanism; verify the lunar anomaly output against modern tables.',
      'Engrave and assemble the Metonic and Saros spiral dials on the back.',
      'Mount the calendar plate on the front; align the zodiac ring.',
      'Fit the hypothetical planetary pointers; mark as inferred reconstruction only.',
    ],
    progress: 68,
  },
  {
    id: 'aeolipile',
    name: 'Aeolipile (Hero\u2019s Engine)',
    overview:
      'A hollow bronze sphere with two opposing nozzles, mounted over a boiler. Steam ejected from the nozzles generates reaction torque.',
    methods: [
      'Hammer-forming of two bronze hemispheres',
      'Soldered seam joining',
      'Drilling of 2 mm tangential nozzles',
      'Copper tube boiler with swivel joint',
    ],
    materials: [
      { name: 'Bronze sheet', spec: '0.8 mm', note: 'Standard alloy of the Roman period.' },
      { name: 'Copper tubing', spec: '8 mm ID', note: 'Carries steam from boiler to sphere.' },
      { name: 'Pivot pin', spec: 'iron 3 mm', note: 'Allows free rotation of sphere.' },
      { name: 'Charcoal boiler', spec: '—', note: 'Provides ~1–2 bar steam pressure.' },
    ],
    principles: [
      'Steam expands through nozzles, accelerating and creating equal-and-opposite reaction force.',
      'Two nozzles tangential to the sphere convert the linear thrust into torque.',
      'Net power is limited by low pressure and small mass flow, estimated at a few watts.',
    ],
    components: [
      { id: 'a1', name: 'Hollow sphere', role: 'Steam reservoir', material: 'Bronze', status: 'Complete' },
      { id: 'a2', name: 'Tangential nozzles (×2)', role: 'Reaction jets', material: 'Bronze', status: 'Complete' },
      { id: 'a3', name: 'Swivel supply pipes', role: 'Steam inlet + rotation axis', material: 'Copper', status: 'In Progress' },
      { id: 'a4', name: 'Boiler', role: 'Steam generator', material: 'Copper', status: 'In Progress' },
    ],
    buildSteps: [
      'Hammer-form two bronze hemispheres over a wooden die.',
      'Solder hemispheres; pressure-test the sphere in water.',
      'Drill two 2 mm tangential nozzles at 180°.',
      'Build copper boiler with charcoal grate and steam outlet.',
      'Assemble swivel pipes and pivot; verify free rotation.',
      'Run under low steam; measure rotational speed and torque.',
    ],
    progress: 45,
  },
  {
    id: 'roman-concrete',
    name: 'Roman Concrete (Opus Caementicium)',
    overview:
      'A lime-pozzolan concrete that hydrates underwater and self-heals through Al-tobermorite crystallisation. Reconstruction focuses on sourcing reactive ash and matching the aggregate gradation.',
    methods: [
      'Slaking quicklime to hydrated lime putty',
      'Mixing with reactive volcanic pozzolan',
      'Layered tuff and pumice aggregate (graded density)',
      'Seawater cure to promote tobermorite growth',
    ],
    materials: [
      { name: 'Hydrated lime (Ca(OH)2)', spec: 'slaked > 2 years', note: 'Aged lime putty gives best workability.' },
      { name: 'Pozzolan ash', spec: 'pulvis Puteolanus equivalent', note: 'Requires reactive phillipsite content.' },
      { name: 'Coarse aggregate', spec: 'tuff, 2–6 cm', note: 'Lighter at top of dome.' },
      { name: 'Fine aggregate', spec: 'pumice, pozzolan sand', note: 'Pumice used in upper dome courses.' },
    ],
    principles: [
      'Lime + pozzolan + water forms C-A-S-H binder without atmospheric CO2 — sets underwater.',
      'Seawater infiltrates microcracks, dissolves ash, and precipitates Al-tobermorite, sealing fractures.',
      'Graded aggregate reduces dead load, enabling large unreinforced spans.',
    ],
    components: [
      { id: 'r1', name: 'Lime putty', role: 'Calcium source', material: 'Slaked lime', status: 'Complete' },
      { id: 'r2', name: 'Pozzolan ash', role: 'Reactive aluminosilicate', material: 'Volcanic ash', status: 'In Progress' },
      { id: 'r3', name: 'Coarse tuff aggregate', role: 'Structural skeleton', material: 'Tuff', status: 'Complete' },
      { id: 'r4', name: 'Pumice aggregate', role: 'Lightweight upper courses', material: 'Pumice', status: 'In Progress' },
      { id: 'r5', name: 'Curing environment', role: 'Seawater hydration', material: 'Seawater', status: 'Hypothetical' },
    ],
    buildSteps: [
      'Slake quicklime in water; age the putty for several months.',
      'Procure reactive pozzolan; test for phillipsite content.',
      'Mix 1:3 lime:pozzolan with coarse aggregate; place in formwork.',
      'Immerse test cubes in seawater; cure 90 days.',
      'Test compressive strength and self-healing on cracked specimens.',
      'Pour a small unreinforced dome section to validate structural behaviour.',
    ],
    progress: 55,
  },
];

// Mock Gemma research responses — clearly labelled demonstration material.
export const gemmaMockResponses: { match: string[]; text: string; citations: { label: string; type: 'evidence' | 'inference' | 'hypothesis' | 'unknown' }[] }[] = [
  {
    match: ['antikythera', 'mechanism', 'gear'],
    text:
      'The Antikythera Mechanism is a verified Hellenistic analog computer (c. 150–100 BCE) recovered from a Roman shipwreck. X-ray tomography by Freeth et al. (2006) revealed at least 30 meshing bronze gears. Its pin-and-slot mechanism models lunar orbital anomaly — a feat not reproduced in Europe for ~1,400 years.\n\nEngineering inference: the device required precision gear-cutting far beyond typical Roman metalwork, implying a specialised workshop. The hypothetical planet pointers remain only partially reconstructed from fragmentary inscriptions.',
    citations: [
      { label: 'Freeth et al. (2006), Nature 444 — gear train reconstruction', type: 'evidence' },
      { label: 'Pin-and-slot anomaly correction — kinematic model', type: 'inference' },
      { label: 'Mars/Venus pointers — inscriptions only, no gears survive', type: 'unknown' },
    ],
  },
  {
    match: ['roman', 'concrete', 'opus', 'pozzolan'],
    text:
      'Roman concrete (opus caementicium) is a verified lime-pozzolan material used from ~300 BCE. Jackson et al. (2014) showed that Al-tobermorite precipitates in seawater-exposed cracks, giving the concrete self-healing properties. The Pantheon dome has stood ~1,900 years unreinforced.\n\nHypothesis: wider use of geopolymer cements based on this chemistry could reduce modern concrete\u2019s CO2 footprint. The exact Roman aggregate gradation schedule is inferred from the Pantheon\u2019s core samples.',
    citations: [
      { label: 'Jackson et al. (2014), American Mineralogist 99', type: 'evidence' },
      { label: 'Al-tobermorite self-healing in seawater', type: 'evidence' },
      { label: 'Modern geopolymer equivalence', type: 'hypothesis' },
    ],
  },
  {
    match: ['battery', 'baghdad', 'electr'],
    text:
      'The Baghdad Battery is a DISPUTED artefact — a Parthian-era terracotta jar containing a copper cylinder and iron rod. Modern reproductions produce ~1–2 V with acidic electrolyte, and some have electroplated small objects.\n\nMainstream archaeology holds the configuration may simply be a scroll-storage vessel; the voltaic effect would then be incidental. No contemporary electroplated objects or textual references to electrical phenomena are known. Treat electroplating use as a hypothesis, not evidence.',
    citations: [
      { label: 'König (1940) original hypothesis', type: 'hypothesis' },
      { label: 'Reproduction generates ~1–2 V', type: 'inference' },
      { label: 'No contemporary electroplated finds', type: 'unknown' },
    ],
  },
  {
    match: ['greek fire', 'byzantine', 'siphon', 'incendiary'],
    text:
      'Greek Fire is a LOST technology — its exact composition died with the Byzantine Empire in 1453. Sources agree it burned on water and was projected by siphonarioi through bronze siphons. Candidate ingredients include naphtha, quicklime, resin, sulfur, and saltpetre.\n\nNo modern reproduction has matched all documented properties (burns on water, self-ignition, adhesion to surfaces). The specific proportions and ignition method are unknown and likely unrecoverable.',
    citations: [
      { label: 'Theophanes the Confessor (9th c.), Chronographia', type: 'evidence' },
      { label: 'Naphtha + quicklime + resin composition', type: 'inference' },
      { label: 'Exact formula and ignition method', type: 'unknown' },
    ],
  },
];

export function findMockResponse(input: string): {
  text: string;
  citations: { label: string; type: 'evidence' | 'inference' | 'hypothesis' | 'unknown' }[];
} {
  const lower = input.toLowerCase();
  for (const r of gemmaMockResponses) {
    if (r.match.some((m) => lower.includes(m))) return { text: r.text, citations: r.citations };
  }
  return {
    text:
      'DEMONSTRATION RESPONSE — Gemma 4 is not yet connected to this frontend.\n\nI can analyse historical technologies, classify evidence status, and propose reconstructions. Try asking about: the Antikythera Mechanism, Roman concrete, the Baghdad Battery, or Greek Fire.\n\nThis reply is generated from a local mock knowledge base. To enable real research, connect a FastAPI backend serving the Gemma 4 model. No model credentials are stored in the frontend.',
    citations: [
      { label: 'Mock response — no live model', type: 'unknown' },
      { label: 'Connect FastAPI backend for live inference', type: 'hypothesis' },
    ],
  };
}

import type { Discovery } from './types';

export const discoveries: Discovery[] = [
  {
    id: 'antikythera',
    name: 'Antikythera Mechanism',
    region: 'Ancient Greece',
    period: 'Hellenistic Period',
    dateRange: 'c. 150–100 BCE',
    category: 'Astronomical Computer',
    significance:
      'The oldest known analog computer — a hand-cranked bronze device that predicted solar eclipses and tracked planetary motion over 1,400 years before comparable geared mechanisms reappeared in Europe.',
    principles:
      'Hand-driven differential gear train; pin-and-slot coupling to model the anomalistic motion of the Moon; 223-tooth Solar Year gear; Metonic and Saros spirals inscribed on faces.',
    evidence: 'Verified',
    summary:
      'A corroded bronze artefact recovered from a Roman-era shipwreck near Antikythera, Greece. X-ray tomography revealed an intricate gear system predicting astronomical cycles.',
    description: [
      'Recovered in 1901 from a Roman cargo shipwreck off the island of Antikythera, the device consists of at least 30 meshing bronze gears housed in a wooden frame roughly the size of a shoebox.',
      'The front dial displayed the 365-day Egyptian calendar and zodiac; the rear dials tracked the Metonic cycle (235 lunar months), the Saros eclipse cycle, and the Callippic cycle.',
      'A pin-and-slot mechanism on one gear pair reproduced the anomalistic month — the variation in lunar orbital speed caused by the Moon elliptical orbit — a feat of kinematic modelling not matched again until medieval clockwork.',
      'Inscriptions in Koine Greek describe the predicted solar and lunar eclipses; the mechanism likely could indicate the colour and hour of an eclipse.',
    ],
    references: [
      'de Solla Price, D. (1974). Gears from the Greeks.',
      'Freeth, T. et al. (2006). Decoding the Antikythera Mechanism. Nature 444.',
      'Freeth, T. et al. (2021). A Model of the Cosmos in the Antikythera Mechanism. Sci. Rep. 11.',
    ],
    glyph: 'antikythera',
    color: '#7a9a6b',
  },
  {
    id: 'baghdad-battery',
    name: 'Baghdad Battery',
    region: 'Ancient Mesopotamia',
    period: 'Parthian / Sassanid Era',
    dateRange: 'c. 250 BCE – 224 CE',
    category: 'Electrochemical Cell (disputed)',
    significance:
      'A terracotta jar containing a copper cylinder and iron rod — a configuration that, when filled with an acidic liquid, produces a small electric charge. Whether it was used as a galvanic cell remains heavily debated.',
    principles:
      'Electrochemical cell: copper cathode, iron anode, acidic electrolyte (vinegar/lemon). Hypothesised use for electroplating or mild medicinal shock; alternatively a storage vessel for sacred scrolls.',
    evidence: 'Disputed',
    summary:
      'Several clay jars with copper cylinders and iron rods were found near Baghdad. Reproductions can generate ~1–2 volts, but no evidence of contemporary electroplating has been found.',
    description: [
      'The artefact consists of a 14 cm tall terracotta jar, a rolled copper sheet cylinder closed at the base, and an iron rod isolated from the copper by an asphalt stopper.',
      'When filled with an electrolyte such as grape juice or vinegar, modern reconstructions produce 0.8–2.0 volts. Some experiments have succeeded in electroplating thin silver onto small objects.',
      'Mainstream archaeology cautions the jar may simply have stored papyrus scrolls, with the copper and iron serving as a container assembly — the voltaic effect would then be incidental.',
      'No wires, no contemporary electroplated objects, and no textual reference to electrical phenomena have been recovered from the period.',
    ],
    references: [
      'König, W. (1940). Im Irak ein galvanisches Element? (In Iraq a galvanic element?).',
      'Eggebrecht, A. (1978). Reproduction experiments at the Roemer- und Pelizaeus-Museum.',
      'Jansen, B. (1997). Recherche van de Baghdad-batterij. De Vrijmeester.',
    ],
    glyph: 'battery',
    color: '#b08a5a',
  },
  {
    id: 'roman-concrete',
    name: 'Roman Concrete (Opus Caementicium)',
    region: 'Roman Empire',
    period: 'Imperial Rome',
    dateRange: 'c. 300 BCE – 476 CE',
    category: 'Structural Material',
    significance:
      'A concrete that grows stronger with age and survives seawater for millennia. Modern analysis revealed reactive volcanic ash that recrystallises, self-healing cracks — superior in durability to modern Portland cement.',
    principles:
      'Hydration of volcanic ash (pozzolan) with lime produces calcium-aluminium-silicate-hydrate (C-A-S-H); seawater infiltration triggers further tobermorite and phillipsite crystallisation, sealing microfractures.',
    evidence: 'Verified',
    summary:
      'Roman harbours, Pantheon dome, and aqueducts use concrete with volcanic ash and lime that continues hardening underwater through mineral growth.',
    description: [
      'Vitruvius described mixing lime with pulvis Puteolanus (Pozzolan ash from Puteoli). Combined with aggregate, it set without exposure to air, enabling massive underwater harbour construction.',
      'Marie Jackson (2014) showed that seawater percolating through cracks dissolves the volcanic ash and precipitates Al-tobermorite, a crystalline mineral that welds fractures shut — a self-healing process.',
      'The Pantheon dome, unreinforced and 43.3 m across, has stood nearly 1,900 years; modern unreinforced concrete would fracture in decades.',
      'Industrial reproduction is challenging due to the need for reactive phillipsite-rich ash and the slow, hot-curing chemistry; a modern equivalent using geopolymer cement is an active research field.',
    ],
    references: [
      'Vitruvius. De Architectura, Book II.',
      'Jackson, M. et al. (2014). Unlocking the Secrets of Al-tobermorite in Roman Seawater Concrete. American Mineralogist 99.',
      'Jackson, M. et al. (2017). Roman concrete: Roman mortar and concrete technology. J. Am. Ceram. Soc.',
    ],
    glyph: 'concrete',
    color: '#a89880',
  },
  {
    id: 'aeolipile',
    name: 'Aeolipile (Hero\u2019s Engine)',
    region: 'Ancient Alexandria',
    period: 'Roman Egypt',
    dateRange: 'c. 50–120 CE',
    category: 'Reaction Steam Turbine',
    significance:
      'The first recorded steam engine — a rotating boiler venting steam through two nozzles. Demonstrated the principle of jet reaction ~1,700 years before the industrial steam engine.',
    principles:
      'Steam ejects from two opposing nozzles on a hollow sphere, producing equal and opposite reaction forces that generate torque — an early reaction turbine / aeolipile.',
    evidence: 'Verified',
    summary:
      'Hero of Alexandria described a spinning brass sphere driven by boiler steam. It produced negligible shaft work but proved jet-reaction principles.',
    description: [
      'Hero\u2019s Pneumaticae describes a hollow sphere mounted on a boiler via two curved pipes; two opposing nozzles tangential to the sphere vent steam, causing it to spin.',
      'The device produced virtually no usable torque — its power-to-weight ratio was far too low for industrial work — so it remained a temple curiosity rather than a prime mover.',
      'Theoretical analysis estimates only a few watts of mechanical output; the boiler consumed far more fuel energy than it converted to rotation.',
      'Had the ancients pursued higher pressures and piston mechanisms, the steam age could theoretically have begun in antiquity — a perennial counterfactual in the history of technology.',
    ],
    references: [
      'Hero of Alexandria. Pneumatica. (translated by Woodcroft, 1851).',
      'Drachmann, A.G. (1963). The Mechanical Technology of Greek and Roman Antiquity.',
      'Landels, J.G. (1978). Engineering in the Ancient World.',
    ],
    glyph: 'aeolipile',
    color: '#c98b6a',
  },
  {
    id: 'damascus-steel',
    name: 'Damascus Steel',
    region: 'Medieval Middle East',
    period: 'Crusader Era',
    dateRange: 'c. 900–1600 CE',
    category: 'Metallurgy',
    significance:
      'Blades forged from Wootz crucible steel that show distinctive swirling watered patterns and legendary toughness — the forging technique was lost by the 18th century and remains only partially reconstructed.',
    principles:
      'High-carbon crucible steel (1–2% C) with carbide-forming elements (V, Mo, Cr) creates cementite bands on slow cooling; cyclic forging and controlled thermal cycling reveals the visible pattern.',
    evidence: 'Fragmentary',
    summary:
      'Crusader-era blades from Damascus show a visible damask pattern. Modern attempts reproduce the pattern but not all reported mechanical properties.',
    description: [
      'Wootz ingots from India (1.5–2% carbon with trace vanadium and molybdenum) were forged at low temperatures to avoid breaking the cementite network, producing a blade whose surface shows a wave-like pattern after etching.',
      'Verhoeven (2006) showed the pattern depends on carbide banding from trace vanadium; absence of those impurities in modern steels explains why simple reproduction fails.',
      'Accounts describe blades that could cut through European swords and shatter stone without losing edge; the full heat-treatment and forging ritual was never written down.',
      'The technique died out by the 1700s — possibly due to depletion of the specific Indian ore deposits or loss of the controlled thermal cycle.',
    ],
    references: [
      'Verhoeven, J., Pendray, A., Dauksch, W. (1998). The key role of impurities in ancient Damascus steel blades. JOM 50.',
      'Wadsworth, J. & Sherby, O. (1979). On the Bulat-Damascus steel revisited. Prog. Mater. Sci.',
      'Srinivasan, S. & Ranganathan, S. (2014). India\u2019s Legendary Wootz Steel.',
    ],
    glyph: 'sword',
    color: '#9aa6ab',
  },
  {
    id: 'seismoscope',
    name: 'Ancient Chinese Seismoscope',
    region: 'Han Dynasty China',
    period: 'Eastern Han',
    dateRange: 'c. 132 CE',
    category: 'Seismic Instrument',
    significance:
      'A bronze vessel by Zhang Heng that reportedly detected an earthquake hundreds of kilometres away and indicated its direction — the earliest known seismic detector, predating European instruments by ~1,700 years.',
    principles:
      'Inverted pendulum inside a bronze vessel; a ground tremor dislodges a ball from a dragon\u2019s mouth into a toad below, indicating the direction of first motion.',
    evidence: 'Fragmentary',
    summary:
      'Described in the Hou Han Shu, the Houfeng Didong Yi had eight dragon heads around a central vessel; internal mechanism is not fully known.',
    description: [
      'Zhang Heng\u2019s Houfeng Didong Yi (instrument for inquiring about winds and earth movement) was a 2 m bronze vessel; eight dragons faced eight toads, each holding a bronze ball.',
      'When a distant earthquake occurred, the first ground motion tilted an internal pendulum, releasing the ball from the dragon in the direction of the tremor\u2019s origin.',
      'A famous account: a ball fell but no tremor was felt locally; days later a messenger arrived reporting a quake in Gansu — the instrument had detected the P-wave, not felt by humans.',
      'No surviving physical artefact or diagram of the internal mechanism exists; modern reconstructions propose an inverted pendulum or an inertia switch.',
    ],
    references: [
      'Fan Ye (5th c.). Hou Han Shu (Book of the Later Han), Treatise on Astronomical Matters.',
      'Needham, J. (1959). Science and Civilisation in China, Vol. 3.',
      'Deweerst, R. (1985). The seismoscope of Zhang Heng. Phys. Teacher.',
    ],
    glyph: 'seismoscope',
    color: '#c79b5a',
  },
  {
    id: 'greek-fire',
    name: 'Greek Fire',
    region: 'Byzantine Empire',
    period: 'Byzantine Era',
    dateRange: 'c. 672–1453 CE',
    category: 'Incendiary Weapon',
    significance:
      'A liquid flame weapon projected through siphons that continued burning on water — credited with saving Constantinople from multiple sieges. Its exact formula was a state secret and was never recovered.',
    principles:
      'Likely a petroleum-naphtha base thickened with resin and quicklime; projected under pressure through bronze siphons; ignited on contact with air/water (formula unknown).',
    evidence: 'Lost',
    summary:
      'Invented by Kallinikos, a Syrian refugee. Projected from ships via siphons; burned on water; formula kept secret and lost with the Empire.',
    description: [
      'Greek Fire was deployed by Byzantine dromon warships against Arab fleets beginning around 672 CE; it burned fiercely on contact with water and could not be quenched.',
      'Sources describe siphon tubes mounted on ships prows, hand-pumped by trained siphonarioi; the liquid ignited on leaving the tube, suggesting a self-igniting pyrophoric compound or an external pilot flame.',
      'Candidate ingredients: naphtha, crude oil, liquid pitch, sulfur, resin, quicklime, saltpetre; exact proportions and ignition method are unknown.',
      'The recipe was a guarded secret of the Byzantine state; lost when Constantinople fell in 1453. No modern reproduction has matched all documented properties.',
    ],
    references: [
      'Theophanes the Confessor (9th c.). Chronographia.',
      'Anna Komnene (12th c.). Alexiad, Book XI.',
      'Haldon, J. (2017). A Tale of Two Saints: The Passion and Miracles of St. Theodore.',
      'Partington, J.R. (1960). A History of Greek Fire and Gunpowder.',
    ],
    glyph: 'flame',
    color: '#d97742',
  },
  {
    id: 'archimedes-screw',
    name: 'Archimedes\u2019 Screw',
    region: 'Ancient Greece',
    period: 'Hellenistic Period',
    dateRange: 'c. 250 BCE',
    category: 'Hydraulic Pump',
    significance:
      'A screw inside a hollow cylinder that lifts water efficiently; attributed to Archimedes; still in use worldwide for irrigation, drainage, and low-head hydro — one of the few ancient technologies continuously operational.',
    principles:
      'Rotating helix inside an inclined cylinder traps water between flights; rotation forces water upward along the helix to be discharged at the top.',
    evidence: 'Verified',
    summary:
      'A helical pump lifting water from low to high levels; attributed to Archimedes and still used in agriculture and water treatment plants.',
    description: [
      'Diodorus and Strabo attribute the device to Archimedes, who likely designed it during a visit to Egypt for Nile irrigation. A helical blade around a central shaft sits in a tilted cylinder.',
      'As the screw rotates, water trapped in each flight rises; energy input per unit water lifted is low compared to a scoop-and-bucket chain, making it suitable for continuous operation.',
      'Modern Archimedes screws pump stormwater, fish-friendly hydropower turbines, and wastewater treatment plants; the principle is inverted in the Archimedes screw generator.',
      'Versions exist in semiconductors, agriculture, and grain handling — its simplicity and tolerance for debris make it one of the longest-surviving machine designs in history.',
    ],
    references: [
      'Diodorus Siculus. Bibliotheca historica, V.37.',
      'Strabo. Geographika, XVI.2.',
      'Rorres, C. (2000). The Turn of the Screw: Optimal Design of an Archimedes Screw. J. Hydr. Eng.',
    ],
    glyph: 'screw',
    color: '#7a9a6b',
  },
];

export const discoveryCategories = [
  'All',
  'Astronomical Computer',
  'Electrochemical Cell (disputed)',
  'Structural Material',
  'Reaction Steam Turbine',
  'Metallurgy',
  'Seismic Instrument',
  'Incendiary Weapon',
  'Hydraulic Pump',
];

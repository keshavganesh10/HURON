import cheshire1 from "@/assets/residence-cheshire-1.jpg";
import cheshire2 from "@/assets/residence-cheshire-2.jpg";
import manchester1 from "@/assets/residence-manchester-1.jpg";
import manchester2 from "@/assets/residence-manchester-2.jpg";
import heroPavilion from "@/assets/hero-pavilion.jpg";

export type Region = "cheshire" | "manchester";

export type ResidenceStatus =
  | "Final Handover"
  | "Fine Interior Tuning"
  | "Off-Plan"
  | "Structural Framing"
  | "Move-In Ready"
  | "Reserved";

export type SpecRow = { label: string; value: string };
export type LedgerRow = { discipline: string; brand: string; detail: string };
export type Upgrade = { id: string; label: string; sublabel: string; delta: number };

export type Residence = {
  id: string;
  region: Region;
  regionLabel: string;
  name: string;
  locality: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  priceValue: number;
  status: ResidenceStatus;
  tagline: string;
  narrative: string;
  materials: string[];
  images: string[];
  gallery: string[];
  specs: SpecRow[];
  ledger: LedgerRow[];
  upgrades: Upgrade[];
};

const DEFAULT_UPGRADES: Upgrade[] = [
  { id: "battery", label: "Solid-State Battery Storage", sublabel: "72-hour autonomy · silent handover", delta: 45000 },
  { id: "joinery", label: "Bespoke Italian Walnut Joinery", sublabel: "Hand-finished by the Huron Atelier", delta: 20000 },
  { id: "acoustic", label: "Aerospace Acoustic Envelope", sublabel: "STC +8 across all suites", delta: 32000 },
  { id: "vault", label: "Biometric Wine & Document Vault", sublabel: "Climate ±0.2°C · Tier-III access", delta: 28000 },
];

export const RESIDENCES: Residence[] = [
  {
    id: "alderley-pavilion",
    region: "cheshire",
    regionLabel: "Cheshire",
    name: "The Alderley Pavilion",
    locality: "Alderley Edge, Cheshire",
    beds: 5,
    baths: 5.5,
    sqft: 6800,
    price: "£4,200,000",
    priceValue: 4200000,
    status: "Final Handover",
    tagline: "A single-storey monolith of Calacatta, oak and silence.",
    narrative:
      "The Alderley Pavilion sits within 3.4 acres of mature parkland as a continuous horizontal plane — a low-carbon geopolymer concrete shell wrapped in floor-to-ceiling bronze-framed glazing. Every mechanical, acoustic and lighting decision was modelled by Huron Engineering before the first foundation cure.",
    materials: [
      "Low-carbon geopolymer concrete foundation",
      "R-value 8.5 thermal envelope",
      "Fully integrated Lutron lighting orchestration",
      "European oak wide-plank flooring throughout",
    ],
    images: [cheshire1, cheshire2],
    gallery: [cheshire1, cheshire2, heroPavilion, cheshire1],
    specs: [
      { label: "Structural Shell", value: "Low-carbon geopolymer · 142 yr design life" },
      { label: "Envelope R-Value", value: "R-8.5 continuous · triple-laminated glazing" },
      { label: "Lighting", value: "Lutron HomeWorks QSX · 24 scenes" },
      { label: "HVAC", value: "Mitsubishi VRF · 7 independent zones" },
      { label: "Heating", value: "Closed-loop geothermal · 6 borehole array" },
      { label: "IoT Sensors", value: "186 fabric, mechanical & security points" },
      { label: "Acoustic Rating", value: "STC 68 between principal suites" },
      { label: "Air Filtration", value: "MERV-16 with HEPA bypass · 4x ACH" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Miele & Gaggenau", detail: "Bespoke induction, steam & vacuum drawers" },
      { discipline: "Bathing Architecture", brand: "Boffi · Vola", detail: "Slab-cut Calacatta wet rooms" },
      { discipline: "Joinery", brand: "Huron Atelier", detail: "Smoked walnut, dovetail-grade craftsmanship" },
      { discipline: "Automation", brand: "Lutron HomeWorks", detail: "Whole-home lighting & shade orchestration" },
      { discipline: "Security", brand: "Huron Vault Tier III", detail: "Encrypted multi-zone perimeter mesh" },
    ],
    upgrades: [],
  },
  {
    id: "deansgate-aviator",
    region: "manchester",
    regionLabel: "Central Manchester",
    name: "Deansgate Aviator Penthouse",
    locality: "Deansgate, Central Manchester",
    beds: 4,
    baths: 4.5,
    sqft: 4400,
    price: "£3,800,000",
    priceValue: 3800000,
    status: "Fine Interior Tuning",
    tagline: "A 42nd-floor penthouse with aerodynamic balcony profiles.",
    narrative:
      "The Aviator Penthouse is engineered with aerospace-grade acoustic dampening and aerodynamic wind-shear balcony profiles — the tower's quietest, most composed residence. A biometric private lift opens directly into a single, uninterrupted volume of bronze and pale oak.",
    materials: [
      "Aerospace-grade acoustic dampening",
      "Aerodynamic wind-shear balcony profiles",
      "Biometric private lift entry",
      "Floor-to-ceiling curtain wall",
    ],
    images: [manchester1, manchester2],
    gallery: [manchester1, manchester2, heroPavilion, manchester1],
    specs: [
      { label: "Structural Shell", value: "Post-tensioned concrete core" },
      { label: "Acoustic Envelope", value: "Aerospace-grade dampening · STC 74" },
      { label: "Balcony Profile", value: "CFD-modelled aerodynamic shear" },
      { label: "Lift", value: "Biometric private · single-resident" },
      { label: "HVAC", value: "VRF heat-recovery · 5 zones" },
      { label: "IoT Sensors", value: "142 fabric, mechanical & security points" },
      { label: "Concierge", value: "24/7 dedicated · separate service lift" },
      { label: "Air Filtration", value: "MERV-15 + activated carbon" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Miele & Sub-Zero", detail: "Concealed appliance wall in oak" },
      { discipline: "Bathing Architecture", brand: "Boffi · CEA", detail: "Honed travertine principal suite" },
      { discipline: "Joinery", brand: "Huron Atelier", detail: "Pale oak millwork, integrated lighting" },
      { discipline: "Automation", brand: "Lutron QSX", detail: "Sun-tracking shade automation" },
      { discipline: "Security", brand: "Huron Vault Tier II", detail: "Biometric lift call + private vestibule" },
    ],
    upgrades: [],
  },
  {
    id: "wilmslow-reserve",
    region: "cheshire",
    regionLabel: "Cheshire",
    name: "The Wilmslow Reserve",
    locality: "Wilmslow, Cheshire",
    beds: 6,
    baths: 6.5,
    sqft: 9200,
    price: "£6,100,000",
    priceValue: 6100000,
    status: "Off-Plan",
    tagline: "A self-sufficient estate with martial arts pavilion and micro-grid.",
    narrative:
      "The Wilmslow Reserve is the most technically ambitious residence in the current portfolio — an autonomous sustainable micro-grid, a bespoke Miele Master-Suite Kitchen and a dedicated endurance conditioning and martial arts studio, wrapped in a low-emission, high-mass shell.",
    materials: [
      "Autonomous sustainable micro-grid",
      "Bespoke Miele Master-Suite Kitchen",
      "Endurance conditioning & martial arts studio",
      "Solid-state battery reserve · 96hr autonomy",
    ],
    images: [cheshire2, cheshire1],
    gallery: [cheshire2, cheshire1, heroPavilion, cheshire2],
    specs: [
      { label: "Energy Architecture", value: "On-site micro-grid · net-positive annualised" },
      { label: "Envelope R-Value", value: "R-9.2 continuous · quadruple glazing" },
      { label: "Battery Reserve", value: "Solid-state · 96 hr autonomy" },
      { label: "HVAC", value: "Ground-source heat pump · 12 zones" },
      { label: "Conditioning Studio", value: "180 m² · sprung timber · dedicated ventilation" },
      { label: "IoT Sensors", value: "312 fabric, mechanical & security points" },
      { label: "Acoustic Rating", value: "STC 72 principal suites" },
      { label: "Water", value: "Rainwater harvest · closed-loop greywater" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Miele Master-Suite", detail: "Twin-island · bespoke copper extraction" },
      { discipline: "Bathing Architecture", brand: "Agape · Vola", detail: "Statuario marble principal wet room" },
      { discipline: "Joinery", brand: "Huron Atelier", detail: "Smoked walnut & blackened brass inlay" },
      { discipline: "Automation", brand: "Crestron Home", detail: "Fully orchestrated lighting, climate, AV" },
      { discipline: "Conditioning", brand: "Rogue · Technogym", detail: "Fitted endurance & martial arts programme" },
      { discipline: "Security", brand: "Huron Vault Tier III", detail: "Biometric perimeter & panic suite" },
    ],
    upgrades: DEFAULT_UPGRADES,
  },
  {
    id: "worsley-garden",
    region: "manchester",
    regionLabel: "Greater Manchester",
    name: "Worsley Garden Estate",
    locality: "Worsley, Greater Manchester",
    beds: 5,
    baths: 5,
    sqft: 5600,
    price: "£2,900,000",
    priceValue: 2900000,
    status: "Structural Framing",
    tagline: "A passive-solar family estate with executive boardroom wing.",
    narrative:
      "Worsley Garden Estate is architected around passive-solar heating architecture and solid-state battery energy storage, with a dedicated executive boardroom and home management suite discreetly integrated behind the principal living volume.",
    materials: [
      "Passive solar heating architecture",
      "Solid-state battery energy storage",
      "Executive boardroom & home management suite",
      "Bronze-framed thermally broken glazing",
    ],
    images: [heroPavilion, cheshire1],
    gallery: [heroPavilion, cheshire1, cheshire2, heroPavilion],
    specs: [
      { label: "Solar Architecture", value: "Passive-solar orientation · 62% annual load" },
      { label: "Battery Reserve", value: "Solid-state · 48 hr autonomy" },
      { label: "Envelope R-Value", value: "R-7.8 continuous · triple glazing" },
      { label: "HVAC", value: "Air-source heat pump · 8 zones" },
      { label: "Boardroom Suite", value: "Acoustically isolated · secure comms" },
      { label: "IoT Sensors", value: "168 fabric, mechanical & security points" },
      { label: "Acoustic Rating", value: "STC 62 principal suites" },
      { label: "Landscape", value: "1.8 acre managed garden · irrigation telemetry" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Gaggenau Vario 400", detail: "Single-island · integrated steam" },
      { discipline: "Bathing Architecture", brand: "Boffi · Vola", detail: "Honed limestone principal suite" },
      { discipline: "Joinery", brand: "Huron Atelier", detail: "European oak millwork throughout" },
      { discipline: "Automation", brand: "Lutron RA3", detail: "Circadian lighting, shade & climate" },
      { discipline: "Comms", brand: "Huron Secure Boardroom", detail: "Encrypted video · SCIF-grade acoustics" },
      { discipline: "Security", brand: "Huron Vault Tier II", detail: "Perimeter mesh · panic vestibule" },
    ],
    upgrades: DEFAULT_UPGRADES,
  },
  {
    id: "castlefield-waterside",
    region: "manchester",
    regionLabel: "Central Manchester",
    name: "Castlefield Waterside",
    locality: "Castlefield, Central Manchester",
    beds: 3,
    baths: 3.5,
    sqft: 3800,
    price: "£4,500,000",
    priceValue: 4500000,
    status: "Move-In Ready",
    tagline: "A canal-side residence in Italian walnut, glass and water.",
    narrative:
      "Castlefield Waterside is complete, commissioned and ready for occupation — Gaggenau throughout, predictive IoT HVAC sensors, and bespoke Italian walnut joinery, opening directly onto its own private canal-side terrace.",
    materials: [
      "Gaggenau appliances throughout",
      "Predictive IoT HVAC sensors",
      "Bespoke Italian walnut joinery",
      "Private canal-side terrace",
    ],
    images: [manchester2, manchester1],
    gallery: [manchester2, manchester1, heroPavilion, manchester2],
    specs: [
      { label: "Kitchen Architecture", value: "Gaggenau Vario · fully commissioned" },
      { label: "HVAC", value: "Predictive VRF · 6 zones · ML-tuned" },
      { label: "Joinery", value: "Bespoke Italian walnut throughout" },
      { label: "Envelope R-Value", value: "R-7.2 continuous · triple glazing" },
      { label: "Waterside Frontage", value: "18m private canal terrace" },
      { label: "IoT Sensors", value: "128 fabric, mechanical & security points" },
      { label: "Acoustic Rating", value: "STC 60 principal suites" },
      { label: "Concierge", value: "Shared 24/7 · private entry" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Gaggenau Vario 400", detail: "Twin-column · induction & steam" },
      { discipline: "Bathing Architecture", brand: "Boffi · Antoniolupi", detail: "Book-matched marble principal suite" },
      { discipline: "Joinery", brand: "Italian Atelier · Huron", detail: "Bespoke walnut millwork throughout" },
      { discipline: "Automation", brand: "Lutron QSX", detail: "Circadian lighting, shade & climate" },
      { discipline: "Security", brand: "Huron Vault Tier II", detail: "Biometric entry · perimeter mesh" },
    ],
    upgrades: [],
  },
];

export const REGIONS: { id: Region; label: string }[] = [
  { id: "cheshire", label: "Cheshire" },
  { id: "manchester", label: "Manchester" },
];

export type FilterKey = "all" | "cheshire" | "manchester" | "off-plan" | "move-in";
export const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All Residences" },
  { id: "cheshire", label: "Cheshire" },
  { id: "manchester", label: "Manchester" },
  { id: "off-plan", label: "Off-Plan" },
  { id: "move-in", label: "Move-In Ready" },
];

export const filterResidences = (key: FilterKey) => {
  switch (key) {
    case "all": return RESIDENCES;
    case "cheshire": return RESIDENCES.filter((r) => r.region === "cheshire");
    case "manchester": return RESIDENCES.filter((r) => r.region === "manchester");
    case "off-plan": return RESIDENCES.filter((r) => r.status === "Off-Plan" || r.status === "Structural Framing");
    case "move-in": return RESIDENCES.filter((r) => r.status === "Move-In Ready" || r.status === "Final Handover");
  }
};

export const getResidence = (id: string) => RESIDENCES.find((r) => r.id === id);

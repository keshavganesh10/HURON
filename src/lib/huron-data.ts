import cheshire1 from "@/assets/residence-cheshire-1.jpg";
import cheshire2 from "@/assets/residence-cheshire-2.jpg";
import manchester1 from "@/assets/residence-manchester-1.jpg";
import manchester2 from "@/assets/residence-manchester-2.jpg";
import heroPavilion from "@/assets/hero-pavilion.jpg";

export type Region = "cheshire" | "manchester";

export type SpecRow = { label: string; value: string };
export type LedgerRow = { discipline: string; brand: string; detail: string };

export type Residence = {
  id: string;
  region: Region;
  name: string;
  locality: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  status: "Fine Interior Tuning" | "Final Handover Checks" | "Foundation Cured" | "Reserved";
  tagline: string;
  narrative: string;
  materials: string[];
  images: string[];
  gallery: string[];
  specs: SpecRow[];
  ledger: LedgerRow[];
};

export const RESIDENCES: Residence[] = [
  {
    id: "huron-i",
    region: "cheshire",
    name: "The Aldford Pavilion",
    locality: "Aldford, Cheshire",
    beds: 5,
    baths: 5.5,
    sqft: 6800,
    price: "£4,950,000",
    status: "Fine Interior Tuning",
    tagline: "A single-storey monolith of Calacatta, oak and silence.",
    narrative:
      "Set within 3.4 acres of mature parkland, The Aldford Pavilion is architected as a continuous horizontal plane — a geopolymer concrete shell wrapped in floor-to-ceiling bronze-framed glazing. Every mechanical, acoustic and lighting decision was modelled by Huron Engineering before the first foundation cure.",
    materials: [
      "Miele Master-Suite Kitchen",
      "Lutron Smart-Grid System",
      "Calacatta Borghini Stonework",
      "European Oak Wide-Plank Flooring",
    ],
    images: [cheshire1, cheshire2],
    gallery: [cheshire1, cheshire2, heroPavilion, cheshire1],
    specs: [
      { label: "Structural Shell", value: "Geopolymer concrete, 142 yr design life" },
      { label: "Envelope R-Value", value: "R-48 walls · R-72 roof" },
      { label: "Glazing", value: "Triple-laminated argon · U-0.74 W/m²K" },
      { label: "HVAC", value: "Mitsubishi VRF · 7 independent zones" },
      { label: "Heating", value: "Closed-loop geothermal · 6 borehole array" },
      { label: "IoT Sensors", value: "186 fabric, mechanical & security points" },
      { label: "Acoustic Rating", value: "STC 68 between principal suites" },
      { label: "Air Filtration", value: "MERV-16 with HEPA bypass · 4x ACH" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Miele & Gaggenau", detail: "Bespoke induction, steam & vacuum drawers" },
      { discipline: "Bathing Architecture", brand: "Boffi · Vola · Antoniolupi", detail: "Slab-cut Calacatta wet rooms" },
      { discipline: "Joinery", brand: "Bespoke Huron Atelier", detail: "Smoked walnut, dovetail-grade craftsmanship" },
      { discipline: "Automation", brand: "Lutron · Crestron", detail: "Whole-home lighting & shade orchestration" },
      { discipline: "Audio Architecture", brand: "Bang & Olufsen", detail: "Invisible in-ceiling, room-corrected" },
      { discipline: "Security", brand: "Honeywell Pro · Huron Vault", detail: "Encrypted multi-zone perimeter mesh" },
    ],
  },
  {
    id: "huron-ii",
    region: "cheshire",
    name: "The Tarporley Estate",
    locality: "Tarporley, Cheshire",
    beds: 6,
    baths: 6,
    sqft: 8200,
    price: "£6,250,000",
    status: "Final Handover Checks",
    tagline: "A six-suite country estate with private climatic wine vault.",
    narrative:
      "Tarporley is the most fully appointed residence in the current portfolio. Two principal suites, a glazed orangery, a 1,400-bottle climatic vault and a discreet staff wing — all wired and commissioned to the Huron lifetime standard before keys are released.",
    materials: [
      "Gaggenau Climatic Wine Vault",
      "Crestron Whole-Home Automation",
      "Bespoke Joinery in Smoked Walnut",
      "Geothermal Heating Array",
    ],
    images: [cheshire2, cheshire1],
    gallery: [cheshire2, cheshire1, heroPavilion, cheshire2],
    specs: [
      { label: "Structural Shell", value: "Geopolymer concrete + Glulam frame" },
      { label: "Envelope R-Value", value: "R-52 walls · R-76 roof" },
      { label: "Glazing", value: "Quadruple-glazed feature spans · U-0.65" },
      { label: "HVAC", value: "Daikin VRV · 11 independent zones" },
      { label: "Wine Vault", value: "1,400 bottle · ±0.2°C tolerance" },
      { label: "IoT Sensors", value: "228 fabric, mechanical & security points" },
      { label: "Acoustic Rating", value: "STC 72 principal suites · STC 60 staff wing" },
      { label: "Backup Power", value: "Tesla Powerwall × 4 · 72hr autonomy" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Gaggenau Vario 400", detail: "Twin-island, copper-clad extraction" },
      { discipline: "Bathing Architecture", brand: "Agape · Vola", detail: "Statuario marble principal wet room" },
      { discipline: "Joinery", brand: "Bespoke Huron Atelier", detail: "Smoked walnut & blackened brass inlay" },
      { discipline: "Automation", brand: "Crestron Home", detail: "Fully orchestrated lighting, climate, AV" },
      { discipline: "Wine Architecture", brand: "Eurocave · Gaggenau", detail: "Three independent climate zones" },
      { discipline: "Security", brand: "Huron Vault Tier III", detail: "Biometric perimeter & panic suite" },
    ],
  },
  {
    id: "huron-iii",
    region: "manchester",
    name: "Deansgate Sky Residence",
    locality: "Deansgate, Manchester",
    beds: 4,
    baths: 4.5,
    sqft: 4200,
    price: "£3,200,000",
    status: "Fine Interior Tuning",
    tagline: "A 38th-floor pied-à-terre wrapped in 360° curtain wall.",
    narrative:
      "A full-floor sky residence engineered as a single uninterrupted volume of glass, anodised bronze and pale oak. Acoustic and thermal envelopes are dramatically over-specified for a city tower — a Huron signature of quiet, regardless of altitude or weather.",
    materials: [
      "Miele Master-Suite Kitchen",
      "Lutron Smart-Grid System",
      "Floor-to-Ceiling Curtain Wall",
      "Concierge Security Tier",
    ],
    images: [manchester1, manchester2],
    gallery: [manchester1, manchester2, heroPavilion, manchester1],
    specs: [
      { label: "Structural Shell", value: "Post-tensioned concrete core" },
      { label: "Envelope R-Value", value: "R-32 curtain wall · R-44 floor plates" },
      { label: "Glazing", value: "Solar-control low-E · 360° span" },
      { label: "HVAC", value: "VRF heat-recovery · 5 zones" },
      { label: "Acoustics", value: "Dual-pane STC 54 to exterior" },
      { label: "IoT Sensors", value: "118 fabric, mechanical & security points" },
      { label: "Concierge", value: "24/7 dedicated · separate service lift" },
      { label: "Air Filtration", value: "MERV-15 + activated carbon" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Miele & Sub-Zero", detail: "Concealed appliance wall in oak" },
      { discipline: "Bathing Architecture", brand: "Boffi · CEA", detail: "Honed travertine principal suite" },
      { discipline: "Joinery", brand: "Bespoke Huron Atelier", detail: "Pale oak millwork, integrated lighting" },
      { discipline: "Automation", brand: "Lutron HomeWorks QSX", detail: "Sun-tracking shade automation" },
      { discipline: "Audio Architecture", brand: "Bang & Olufsen", detail: "Zone-by-zone, voice-orchestrated" },
      { discipline: "Security", brand: "Huron Vault Tier II", detail: "Biometric lift call + private vestibule" },
    ],
  },
  {
    id: "huron-iv",
    region: "manchester",
    name: "St. John's Penthouse",
    locality: "St. John's Quarter, Manchester",
    beds: 3,
    baths: 3.5,
    sqft: 3450,
    price: "£2,750,000",
    status: "Foundation Cured",
    tagline: "A duplex penthouse with private lift vestibule and roof garden.",
    narrative:
      "Two storeys above the city — a discreet duplex residence over a single, biometric lift vestibule. The principal suite occupies its own floor; the private roof garden is engineered with planted thermal mass and full irrigation telemetry.",
    materials: [
      "Boffi Bathing Suite",
      "Bang & Olufsen Acoustic Architecture",
      "Private Lift Vestibule",
      "Bronze-Framed Glazing",
    ],
    images: [manchester2, manchester1],
    gallery: [manchester2, manchester1, heroPavilion, manchester2],
    specs: [
      { label: "Structural Shell", value: "Geopolymer concrete + CLT roof" },
      { label: "Envelope R-Value", value: "R-40 walls · R-60 roof terrace" },
      { label: "Glazing", value: "Triple-laminated · bronze frame · U-0.78" },
      { label: "HVAC", value: "VRF · 4 zones · radiant slab" },
      { label: "Roof Garden", value: "Planted thermal mass · drip telemetry" },
      { label: "IoT Sensors", value: "96 fabric, mechanical & security points" },
      { label: "Lift", value: "Private biometric · single-resident" },
      { label: "Acoustic Rating", value: "STC 64 between floors" },
    ],
    ledger: [
      { discipline: "Kitchen Suite", brand: "Boffi K-Lab", detail: "Single block of Pietra Serena" },
      { discipline: "Bathing Architecture", brand: "Boffi · Antoniolupi", detail: "Sculpted basalt principal bath" },
      { discipline: "Joinery", brand: "Bespoke Huron Atelier", detail: "Fumed oak with blackened steel inlay" },
      { discipline: "Automation", brand: "Lutron RA3", detail: "Whole-home shade & circadian lighting" },
      { discipline: "Audio Architecture", brand: "Bang & Olufsen", detail: "Invisible terrace + interior speakers" },
      { discipline: "Security", brand: "Huron Vault Tier II", detail: "Biometric lift + concierge integration" },
    ],
  },
];

export const REGIONS: { id: Region; label: string }[] = [
  { id: "cheshire", label: "Cheshire Portfolio" },
  { id: "manchester", label: "Central Manchester Penthouses" },
];

export const getResidence = (id: string) => RESIDENCES.find((r) => r.id === id);

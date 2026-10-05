/* =====================================================================
   PORTFOLIO + REVIEWS DATA
   ---------------------------------------------------------------------
   Edit this file to add real projects. Everything below is EXAMPLE
   content to show the layout. Replace it with real completed work
   before launch and set `sample: false` (or delete the line) so the
   "Example" tag disappears.

   Photos: put files in /images/projects/<project-id>/ and list them in
   `images`. Any image that is missing shows a styled wood-grain
   placeholder instead, so the site never looks broken.

   category must be one of:
     cabinetry | kitchens | stairs | finish | commercial | outdoor
   ===================================================================== */

window.PROJECTS = [
  {
    id: "walnut-kitchen-cobourg",
    sample: true,
    title: "Walnut Kitchen & Waterfall Island",
    category: "kitchens",
    location: "Cobourg",
    year: 2025,
    tone: "#6b4527",
    images: [
      { src: "images/projects/walnut-kitchen-cobourg/wide.jpg",    caption: "Wide-angle room shot" },
      { src: "images/projects/walnut-kitchen-cobourg/joinery.jpg", caption: "Drawer box dovetails" },
      { src: "images/projects/walnut-kitchen-cobourg/detail.jpg",  caption: "Grain-matched drawer fronts" }
    ],
    before: "images/projects/walnut-kitchen-cobourg/before.jpg",
    after:  "images/projects/walnut-kitchen-cobourg/after.jpg",
    need: "An open-concept kitchen with more storage, a seating island for four, and a warm, natural finish to match the home's original hardwood.",
    materials: ["Rift-cut walnut veneer", "Solid walnut edge banding", "Quartz waterfall top", "Soft-close concealed hinges & full-extension slides"],
    details: ["Continuous grain match across all drawer fronts", "Integrated finger pulls, no visible hardware", "Hand-cut dovetail drawer boxes"],
    cost: "$38,000 – $46,000",
    timeline: "6 weeks build · 4 days install",
    notes: "Installed in two phases so the family kept a working sink throughout."
  },
  {
    id: "open-stair-port-hope",
    sample: true,
    title: "Open-Riser Oak Staircase",
    category: "stairs",
    location: "Port Hope",
    year: 2025,
    tone: "#a87a4a",
    images: [
      { src: "images/projects/open-stair-port-hope/wide.jpg",   caption: "Full staircase from the foyer" },
      { src: "images/projects/open-stair-port-hope/tread.jpg",  caption: "Tread-to-stringer connection" },
      { src: "images/projects/open-stair-port-hope/rail.jpg",   caption: "Handrail return detail" }
    ],
    before: "images/projects/open-stair-port-hope/before.jpg",
    after:  "images/projects/open-stair-port-hope/after.jpg",
    need: "Replace a closed, carpeted stair with an open design that brings light into the front hall.",
    materials: ["Select white oak treads", "Steel mono-stringer (fabricated by partner)", "Oak handrail with matte oil finish"],
    details: ["3\" solid treads with eased edges", "Concealed fastening, no visible screws", "Railing built to Ontario Building Code"],
    cost: "$22,000 – $28,000",
    timeline: "4 weeks build · 3 days install",
    notes: "Temporary stair access was maintained during removal."
  },
  {
    id: "mudroom-grafton",
    sample: true,
    title: "Family Mudroom Built-In",
    category: "cabinetry",
    location: "Grafton",
    year: 2024,
    tone: "#7f8a7a",
    images: [
      { src: "images/projects/mudroom-grafton/wide.jpg",   caption: "Full mudroom wall" },
      { src: "images/projects/mudroom-grafton/bench.jpg",  caption: "Bench with boot drawers" }
    ],
    before: "images/projects/mudroom-grafton/before.jpg",
    after:  "images/projects/mudroom-grafton/after.jpg",
    need: "A hard-wearing drop zone for a family of five: hooks, boot storage, and a place to sit.",
    materials: ["Painted maple doors (sage green)", "Pre-finished birch plywood boxes", "Solid oak bench top"],
    details: ["Shiplap backs on each locker", "Vented boot drawers", "Scribed to an out-of-square wall"],
    cost: "$9,500 – $12,500",
    timeline: "3 weeks build · 2 days install",
    notes: ""
  },
  {
    id: "reception-desk-durham",
    sample: true,
    title: "Clinic Reception Desk",
    category: "commercial",
    location: "Durham Region",
    year: 2024,
    tone: "#3f3a36",
    images: [
      { src: "images/projects/reception-desk-durham/wide.jpg",    caption: "Reception area" },
      { src: "images/projects/reception-desk-durham/detail.jpg",  caption: "Slatted front panel" }
    ],
    before: "",
    after: "",
    need: "A welcoming, accessible reception desk with storage, cable management and a lowered transaction counter.",
    materials: ["Oak slat cladding", "Black laminate work surfaces", "LED strip under transaction ledge"],
    details: ["Accessible lowered counter section", "Hidden cable trays and grommets", "Built in sections for after-hours install"],
    cost: "$14,000 – $18,000",
    timeline: "3 weeks build · 1 night install",
    notes: "Installed overnight so the clinic opened on schedule."
  },
  {
    id: "cedar-pergola-brighton",
    sample: true,
    title: "Cedar Pergola & Deck",
    category: "outdoor",
    location: "Brighton",
    year: 2024,
    tone: "#9a5f3a",
    images: [
      { src: "images/projects/cedar-pergola-brighton/wide.jpg",   caption: "Pergola over the new deck" },
      { src: "images/projects/cedar-pergola-brighton/joint.jpg",  caption: "Notched beam joinery" }
    ],
    before: "images/projects/cedar-pergola-brighton/before.jpg",
    after:  "images/projects/cedar-pergola-brighton/after.jpg",
    need: "An outdoor room for summer dinners with partial shade and a deck that ties into the existing patio.",
    materials: ["Western red cedar", "Hidden deck fasteners", "Galvanized post bases"],
    details: ["Notched and through-bolted beam connections", "Tapered rafter tails", "Picture-framed deck border"],
    cost: "$18,000 – $24,000",
    timeline: "2 weeks build · 5 days install",
    notes: ""
  },
  {
    id: "wainscoting-toronto",
    sample: true,
    title: "Dining Room Wainscoting & Crown",
    category: "finish",
    location: "Greater Toronto Area",
    year: 2025,
    tone: "#c9bfae",
    images: [
      { src: "images/projects/wainscoting-toronto/wide.jpg",   caption: "Dining room" },
      { src: "images/projects/wainscoting-toronto/crown.jpg",  caption: "Built-up crown moulding" }
    ],
    before: "images/projects/wainscoting-toronto/before.jpg",
    after:  "images/projects/wainscoting-toronto/after.jpg",
    need: "Add character to a plain new-build dining room with panelling and a substantial crown.",
    materials: ["MDF raised-panel wainscoting", "Three-piece built-up crown", "Paint-grade poplar casings"],
    details: ["Panels laid out symmetrically from the window centreline", "Coped inside corners", "Caulked, filled and spray-finished"],
    cost: "$7,500 – $10,000",
    timeline: "1 week build · 4 days install",
    notes: ""
  },
  {
    id: "media-wall-cobourg",
    sample: true,
    title: "Fireplace Media Wall",
    category: "cabinetry",
    location: "Cobourg",
    year: 2025,
    tone: "#2f3b40",
    images: [
      { src: "images/projects/media-wall-cobourg/wide.jpg",    caption: "Living room media wall" },
      { src: "images/projects/media-wall-cobourg/shelves.jpg", caption: "Floating shelves with lighting" }
    ],
    before: "images/projects/media-wall-cobourg/before.jpg",
    after:  "images/projects/media-wall-cobourg/after.jpg",
    need: "Frame a new linear fireplace with storage and display shelving while hiding all AV equipment.",
    materials: ["Painted MDF (deep slate)", "White oak floating shelves", "Ventilated AV cabinet doors"],
    details: ["Concealed shelf brackets", "Integrated LED channels", "Heat-rated clearances around the fireplace"],
    cost: "$12,000 – $16,000",
    timeline: "3 weeks build · 3 days install",
    notes: ""
  },
  {
    id: "double-vanity-port-hope",
    sample: true,
    title: "Floating Double Vanity",
    category: "kitchens",
    location: "Port Hope",
    year: 2024,
    tone: "#b08a5c",
    images: [
      { src: "images/projects/double-vanity-port-hope/wide.jpg",   caption: "Primary ensuite" },
      { src: "images/projects/double-vanity-port-hope/drawer.jpg", caption: "U-shaped plumbing drawer" }
    ],
    before: "",
    after: "",
    need: "A wall-hung double vanity with maximum drawer storage around the plumbing.",
    materials: ["Quarter-sawn white oak", "Moisture-resistant core", "Catalyzed lacquer finish"],
    details: ["U-shaped drawers built around the drains", "Wall cleat mounting, rated for the stone top", "Toe-kick night light"],
    cost: "$6,500 – $9,000",
    timeline: "2 weeks build · 1 day install",
    notes: ""
  }
];

/* =====================================================================
   REVIEWS
   The Reviews section stays hidden while this list is empty.
   Only add real, verified client reviews (e.g. copied from Google).

   Format:
   { name: "Jane D.", location: "Cobourg", project: "Kitchen", text: "…", rating: 5, source: "Google" }
   ===================================================================== */

window.REVIEWS = [];

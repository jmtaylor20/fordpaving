export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  intro: string;
  image: string;
  alt: string;
  points: string[];
  applications: string[];
};

export const phoneDisplay = "334.703.1949";
export const phoneHref = "tel:+13347031949";
export const email = "shane@fordpaving.com";
export const serviceArea = "Central Alabama";

export const services: Service[] = [
  {
    slug: "asphalt-paving",
    title: "Asphalt Paving",
    eyebrow: "Built from the base up",
    summary:
      "Smooth, durable blacktop installed with careful grading, clean edges, and a finish made to perform.",
    intro:
      "A lasting asphalt surface starts below the mat. We approach each paving project as a complete system—from drainage and base preparation through compaction and the final tie-in.",
    image: "/assets/service-asphalt.jpg",
    alt: "Professional crew paving a commercial asphalt parking lot",
    points: [
      "Site preparation and grading",
      "New asphalt installation",
      "Resurfacing and overlays",
      "Clean transitions and finished edges",
    ],
    applications: ["Commercial properties", "Private roads", "Parking lots", "Driveways"],
  },
  {
    slug: "sealcoating",
    title: "Sealcoating",
    eyebrow: "Protect the pavement you own",
    summary:
      "A clean, uniform protective finish that refreshes curb appeal and helps asphalt stand up to the elements.",
    intro:
      "Sealcoating is preventive maintenance with an immediate visual payoff. Proper cleaning, preparation, and even application help shield asphalt from oxidation, moisture, fuel, and daily wear.",
    image: "/assets/service-sealcoating.jpg",
    alt: "Worker applying black sealcoat to a commercial parking lot",
    points: [
      "Surface cleaning and preparation",
      "Crack and problem-area review",
      "Even, professional application",
      "Clear curing and reopening guidance",
    ],
    applications: ["Parking lots", "Drive lanes", "Private roads", "Residential driveways"],
  },
  {
    slug: "striping-thermoplastic",
    title: "Striping & Thermoplastic",
    eyebrow: "Precision people can see",
    summary:
      "Crisp layouts, bright markings, and durable thermoplastic details for safer, sharper-looking pavement.",
    intro:
      "Well-planned pavement markings improve flow, use space efficiently, and make a strong first impression. We handle fresh layouts and restriping with attention to alignment, visibility, and clean geometry.",
    image: "/assets/service-striping.jpg",
    alt: "Professional line striping machine marking a newly paved parking lot",
    points: [
      "New layouts and restriping",
      "Parking stalls and directional markings",
      "Fire lanes and curb markings",
      "Thermoplastic symbols and details",
    ],
    applications: ["Retail centers", "Offices", "Industrial sites", "Community properties"],
  },
  {
    slug: "driveways",
    title: "Asphalt Driveways",
    eyebrow: "A better arrival home",
    summary:
      "Strong, smooth residential driveways designed for everyday use and finished for standout curb appeal.",
    intro:
      "Your driveway works hard every day. We focus on the details that make it last: a stable base, positive drainage, proper compaction, and a clean connection to the road and surrounding landscape.",
    image: "/assets/service-driveway.jpg",
    alt: "Fresh asphalt driveway leading to a home in east-central Alabama",
    points: [
      "New driveway installation",
      "Driveway replacement",
      "Extensions and turnarounds",
      "Resurfacing and repair",
    ],
    applications: ["Homes", "Country properties", "Shared drives", "Private entrances"],
  },
  {
    slug: "parking-lots",
    title: "Parking Lots",
    eyebrow: "Make every arrival count",
    summary:
      "Complete parking lot paving and maintenance for a clean appearance, organized traffic, and dependable performance.",
    intro:
      "A parking lot is often the first part of your property customers experience. We coordinate paving, repairs, sealing, and markings to create a finished surface that looks professional and works logically.",
    image: "/assets/service-parking-lot.jpg",
    alt: "Freshly paved and striped commercial parking lot",
    points: [
      "New lot construction and paving",
      "Resurfacing and rehabilitation",
      "Maintenance planning",
      "Striping and pavement markings",
    ],
    applications: ["Commercial", "Industrial", "Multifamily", "Institutional"],
  },
  {
    slug: "patching-repair",
    title: "Patching & Repair",
    eyebrow: "Fix the failure before it spreads",
    summary:
      "Targeted asphalt repairs that remove failed pavement, restore the surface, and help prevent larger problems.",
    intro:
      "Potholes, broken edges, and failed areas rarely improve on their own. A properly prepared patch restores usability and gives surrounding pavement a better chance to keep performing.",
    image: "/assets/service-patching.jpg",
    alt: "Asphalt repair crew installing a full-depth parking lot patch",
    points: [
      "Pothole and failed-area repair",
      "Full-depth patching",
      "Edge and transition repair",
      "Surface condition assessment",
    ],
    applications: ["Parking lots", "Driveways", "Private roads", "Service areas"],
  },
];

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/contact", label: "Contact" },
];

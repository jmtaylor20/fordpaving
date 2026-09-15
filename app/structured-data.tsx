import { email, phoneDisplay, serviceArea, services, type Service } from "./site-data";

export const siteUrl = process.env.URL ?? "https://fordpaving.com";
export const businessName = "Ford Paving & Sealing";
export const businessId = `${siteUrl}/#business`;

const telephone = `+1-${phoneDisplay.replace(/\./g, "-")}`;

/** Site-wide LocalBusiness record. Rendered once, in the root layout. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessId,
    name: businessName,
    url: siteUrl,
    telephone,
    email,
    image: `${siteUrl}/og.png`,
    logo: `${siteUrl}/assets/logo-header.png`,
    description:
      "Asphalt paving, sealcoating, striping, thermoplastic markings, driveways, parking lots, and patching with free estimates in Central Alabama.",
    slogan: "Built smooth. Finished sharp.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Opelika",
      addressRegion: "AL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "State", name: "Alabama" },
      { "@type": "AdministrativeArea", name: serviceArea },
      { "@type": "City", name: "Opelika" },
      { "@type": "City", name: "Beauregard" },
      { "@type": "City", name: "Auburn" },
    ],
    knowsAbout: services.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pavement services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${siteUrl}/${service.slug}/#service`,
          name: service.title,
          url: `${siteUrl}/${service.slug}/`,
        },
      })),
    },
    makesOffer: {
      "@type": "Offer",
      name: "Free estimate",
      price: "0",
      priceCurrency: "USD",
      url: `${siteUrl}/contact/`,
    },
  };
}

/** WebSite record for the home page. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: businessName,
    publisher: { "@id": businessId },
  };
}

/** Service record for an individual service page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/${service.slug}/#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: `${siteUrl}/${service.slug}/`,
    image: `${siteUrl}${service.image}`,
    provider: { "@id": businessId },
    areaServed: { "@type": "AdministrativeArea", name: serviceArea },
    audience: {
      "@type": "Audience",
      audienceType: service.applications.join(", "),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} services`,
      itemListElement: service.points.map((point) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: point },
      })),
    },
    offers: {
      "@type": "Offer",
      name: "Free estimate",
      price: "0",
      priceCurrency: "USD",
      url: `${siteUrl}/contact/`,
    },
  };
}

/** Breadcrumb trail. Every entry after the first is one path segment. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** Typed WebPage record (AboutPage, ContactPage, CollectionPage, and so on). */
export function webPageSchema(type: string, name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": businessId },
  };
}

/** Renders one or more schema.org records as JSON-LD script tags. */
export function JsonLd({ data }: { data: object | object[] }) {
  const records = Array.isArray(data) ? data : [data];
  return (
    <>
      {records.map((record, index) => (
        <script
          key={index}
          type="application/ld+json"
          // "<" is escaped so the JSON can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(record).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

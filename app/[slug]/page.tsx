import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EstimateForm } from "../estimate-form";
import { ThankYouGate } from "../thank-you-gate";
import { EstimateBand, PageHero, PageShell } from "../site-shell";
import { email, phoneDisplay, phoneHref, serviceArea, services } from "../site-data";

type Props = { params: Promise<{ slug: string }> };

const standardPages = [
  "about",
  "contact",
  "gallery",
  "privacy-policy",
  "services",
  "thank-you",
];

export function generateStaticParams() {
  return [...standardPages, ...services.map((service) => service.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const titles: Record<string, string> = {
    about: "About Ford Paving & Sealing",
    contact: "Request a Free Estimate",
    gallery: "Paving & Pavement Photo Gallery",
    "privacy-policy": "Privacy Policy",
    services: "Asphalt Paving & Maintenance Services",
    "thank-you": "Thank You",
  };
  const descriptions: Record<string, string> = {
    about: "Learn about Ford Paving & Sealing’s practical, detail-driven approach to pavement work.",
    contact: "Request a free asphalt paving, sealcoating, striping, driveway, patching, or parking lot estimate.",
    gallery: "Explore asphalt, sealcoating, striping, driveway, and parking lot work from Ford Paving & Sealing.",
    "privacy-policy":
      "Read how Ford Paving & Sealing collects, uses, protects, and shares information submitted through this website.",
    services: "Explore asphalt paving, sealcoating, striping, thermoplastic, driveway, parking lot, and patching services.",
    "thank-you": "Your estimate request has been received by Ford Paving & Sealing.",
  };

  return {
    title: service ? `${service.title} | Ford Paving & Sealing` : titles[slug],
    description: service
      ? `${service.summary} Serving ${serviceArea}.`
      : descriptions[slug],
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (service) {
    return (
      <PageShell>
        <PageHero
          eyebrow={service.eyebrow}
          title={service.title}
          copy={`${service.summary} Proudly serving ${serviceArea}.`}
          image={service.image}
        />
        <section className="section service-detail">
          <div className="container service-detail-grid">
            <div className="service-main-copy">
              <span className="eyebrow">Professional pavement care</span>
              <h2>Built around the way your property actually works.</h2>
              <p className="lead">{service.intro}</p>
              <div className="detail-points">
                {service.points.map((point, index) => (
                  <div key={point}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
              <h3>Ideal for</h3>
              <div className="tag-list">
                {service.applications.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <aside>
              <EstimateForm title={`Start your ${service.title.toLowerCase()} estimate`} />
            </aside>
          </div>
        </section>
        <section className="section related-services">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="eyebrow">Complete pavement care</span>
                <h2>Pair the right services.</h2>
              </div>
              <Link href="/services" className="text-link">
                View all services <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="related-grid">
              {services
                .filter((item) => item.slug !== service.slug)
                .slice(0, 3)
                .map((item) => (
                  <Link href={`/${item.slug}`} key={item.slug}>
                    <Image src={item.image} alt={item.alt} width={720} height={430} />
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
        <EstimateBand />
      </PageShell>
    );
  }

  if (slug === "about") {
    return (
      <PageShell>
        <PageHero
          eyebrow="About Ford"
          title="Pavement work with a clear point of view."
          copy="Prepare it right. Build it clean. Finish every detail like it matters—because it does."
          image="/assets/asphalt-pattern.jpg"
        />
        <section className="section about-story">
          <div className="container about-grid">
            <div>
              <span className="eyebrow">Our approach</span>
              <h2>We see the whole surface, not just the obvious problem.</h2>
            </div>
            <div className="story-copy">
              <p className="lead">
                Ford Paving & Sealing is built around practical recommendations, disciplined
                preparation, and a sharp final finish for properties throughout {serviceArea}.
              </p>
              <p>
                Pavement is a system. Base conditions, water movement, traffic, edges, repairs,
                sealer, and markings all work together. We look at how the property is used before
                recommending how it should be improved.
              </p>
              <p>
                That means a straightforward conversation at the start, a clear estimate, and
                careful attention to the pieces people notice every day: smooth transitions, neat
                lines, clean boundaries, and an orderly jobsite.
              </p>
            </div>
          </div>
        </section>
        <section className="section values-section">
          <div className="container value-grid">
            {[
              ["01", "Preparation", "The visible finish is only as good as the work underneath it."],
              ["02", "Clarity", "Recommendations and project scope should be easy to understand."],
              ["03", "Precision", "Edges, tie-ins, coverage, and lines deserve disciplined attention."],
              ["04", "Respect", "For the property, the schedule, the people, and the work itself."],
            ].map(([number, title, copy]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <EstimateBand />
      </PageShell>
    );
  }

  if (slug === "services") {
    return (
      <PageShell>
        <PageHero
          eyebrow="Pavement services"
          title="One surface. A complete set of solutions."
          copy="From new blacktop to the final thermoplastic marking, Ford brings every part of your pavement into focus."
          image="/assets/asphalt-aerial.jpg"
        />
        <section className="section service-list-section">
          <div className="container stacked-services">
            {services.map((item, index) => (
              <Link href={`/${item.slug}`} className="stacked-service" key={item.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                </div>
                <Image src={item.image} alt={item.alt} width={640} height={360} />
                <strong aria-hidden="true">↗</strong>
              </Link>
            ))}
          </div>
        </section>
        <EstimateBand />
      </PageShell>
    );
  }

  if (slug === "gallery") {
    const gallery = [
      ["/assets/service-asphalt.jpg", "Fresh commercial asphalt paving in progress"],
      ["/assets/service-patching.jpg", "Full-depth asphalt patching and repair"],
      ["/assets/service-sealcoating.jpg", "Commercial sealcoat application"],
      ["/assets/service-striping.jpg", "Parking lot line striping in progress"],
      ["/assets/service-parking-lot.jpg", "Finished commercial parking lot and markings"],
      ["/assets/service-driveway.jpg", "New residential asphalt driveway"],
      ["/assets/asphalt-aerial.jpg", "Aerial view of a finished asphalt surface"],
      ["/assets/asphalt-detail.jpg", "Detailed view of dense asphalt aggregate"],
    ];
    return (
      <PageShell>
        <PageHero
          eyebrow="Photo gallery"
          title="Good pavement speaks in surfaces and lines."
          copy="A closer look at the texture, precision, and visual transformation behind professional pavement work."
          image="/assets/asphalt-angle.jpg"
        />
        <section className="section">
          <div className="container gallery-grid">
            {gallery.map(([src, alt], index) => (
              <figure key={src} className={index === 0 || index === 3 ? "gallery-wide" : ""}>
                <Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <EstimateBand />
      </PageShell>
    );
  }

  if (slug === "contact") {
    return (
      <PageShell>
        <PageHero
          eyebrow="Start a project"
          title="Tell us where the pavement needs attention."
          copy="Request a free estimate for asphalt, sealcoating, striping, driveways, parking lots, patching, and more."
          image="/assets/asphalt-pattern.jpg"
        />
        <section className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-details">
              <span className="eyebrow">Talk with Ford</span>
              <h2>A straightforward start.</h2>
              <p>
                Send the basics and we’ll follow up to learn more about the surface, property, and
                timing in {serviceArea}.
              </p>
              <div className="contact-list">
                <a href={phoneHref}>
                  <span>Phone</span>
                  <strong>{phoneDisplay}</strong>
                </a>
                <a href={`mailto:${email}`}>
                  <span>Email</span>
                  <strong>{email}</strong>
                </a>
                <div>
                  <span>Service area</span>
                  <strong>{serviceArea}</strong>
                </div>
                <div>
                  <span>Estimate</span>
                  <strong>Free and pressure-free</strong>
                </div>
              </div>
            </div>
            <EstimateForm title="Request your free estimate" />
          </div>
        </section>
      </PageShell>
    );
  }

  if (slug === "privacy-policy") {
    return (
      <PageShell>
        <PageHero
          eyebrow="Your information"
          title="Privacy Policy"
          copy="How Ford Paving & Sealing handles information submitted through this website and our estimate request form."
          image="/assets/asphalt-pattern.jpg"
        />
        <section className="section policy-section">
          <article className="container policy-content">
            <p className="policy-updated">Effective date: August 6, 2026</p>

            <h2>Our commitment</h2>
            <p>
              Ford Paving & Sealing respects your privacy. This policy explains what information
              we collect through fordpaving.com, why we collect it, how we use it, and the choices
              available to you.
            </p>

            <h2>Information we collect</h2>
            <p>
              When you request an estimate, we may collect your name, phone number, email address,
              requested service, and the project details you choose to provide. Our website and
              hosting providers may also process limited technical information, such as an IP
              address, browser type, device information, and security or access logs.
            </p>

            <h2>How we use information</h2>
            <p>We may use the information we collect to:</p>
            <ul>
              <li>Respond to estimate requests and questions.</li>
              <li>Contact you about your property, project needs, scheduling, or services.</li>
              <li>Operate, maintain, secure, and improve this website.</li>
              <li>Prevent spam, fraud, misuse, or other security issues.</li>
              <li>Comply with legal obligations and protect our rights.</li>
            </ul>

            <h2>How we share information</h2>
            <p>
              We do not sell or rent your personal information. We may share information with
              service providers that help us host the website, process forms, deliver email
              notifications, or operate the business. We may also disclose information when
              required by law, to protect rights or safety, or as part of a business transfer.
            </p>

            <h2>Forms, spam protection, and browser storage</h2>
            <p>
              Estimate requests are processed through Netlify Forms, which uses automated spam
              filtering and related security measures. After a successful submission, this site
              stores a temporary indicator in your browser session so it can display the Thank You
              page. That indicator does not contain the information entered in the form and is
              cleared when the browser session ends.
            </p>

            <h2>Data retention and security</h2>
            <p>
              We retain information for as long as reasonably necessary to respond to your request,
              provide services, maintain business records, resolve disputes, and meet legal
              obligations. We use reasonable administrative and technical safeguards, but no method
              of electronic transmission or storage can be guaranteed completely secure.
            </p>

            <h2>Your choices</h2>
            <p>
              You may ask to review, correct, or delete personal information you submitted through
              this website, subject to applicable legal and recordkeeping requirements. You can also
              choose not to use the online form and contact us by phone instead.
            </p>

            <h2>Children’s privacy</h2>
            <p>
              This website is intended for property owners and others seeking paving services. It is
              not directed to children under 13, and we do not knowingly collect personal information
              from children under 13.
            </p>

            <h2>Policy updates</h2>
            <p>
              We may update this policy as our website or practices change. The effective date at the
              top of this page identifies the latest version.
            </p>

            <h2>Contact us</h2>
            <p>
              Questions or privacy requests may be sent to <a href={`mailto:${email}`}>{email}</a> or
              made by phone at <a href={phoneHref}>{phoneDisplay}</a>.
            </p>
          </article>
        </section>
      </PageShell>
    );
  }

  if (slug === "thank-you") {
    return (
      <PageShell>
        <section className="thank-you-section">
          <div className="thank-you-texture" aria-hidden="true" />
          <div className="container">
            <ThankYouGate />
          </div>
        </section>
      </PageShell>
    );
  }

  notFound();
}

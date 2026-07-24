import Image from "next/image";
import Link from "next/link";
import { EstimateForm } from "./estimate-form";
import { EstimateBand, PageShell } from "./site-shell";
import { phoneDisplay, phoneHref, serviceArea, services } from "./site-data";

export default function Home() {
  return (
    <PageShell>
      <section className="home-hero">
        <Image
          className="hero-image"
          src="/assets/service-asphalt.jpg"
          alt="Ford Paving crew installing a smooth commercial asphalt surface"
          fill
          sizes="100vw"
          priority
        />
        <div className="hero-shade" />
        <div className="hero-asphalt" aria-hidden="true" />
        <div className="hero-road-line" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow eyebrow--light">Paving • Sealing • Striping</span>
            <h1>
              Built smooth.
              <br />
              <em>Finished sharp.</em>
            </h1>
            <p>
              Professional asphalt paving and pavement maintenance for driveways, parking lots,
              and commercial properties in {serviceArea}.
            </p>
            <div className="button-row">
              <Link className="button button--white" href="/contact">
                Request a free estimate <span aria-hidden="true">↗</span>
              </Link>
              <a className="button button--ghost" href={phoneHref}>
                Call {phoneDisplay}
              </a>
            </div>
          </div>
          <div className="hero-proof">
            <span>01</span>
            <p>One crew. Complete pavement care.</p>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <p>
            <strong>Clear estimates</strong>
            Straightforward project scope
          </p>
          <p>
            <strong>Clean execution</strong>
            Detail-driven workmanship
          </p>
          <p>
            <strong>Complete service</strong>
            From paving to final stripe
          </p>
          <p>
            <strong>Responsive contact</strong>
            A real conversation, fast
          </p>
        </div>
      </section>

      <section className="section services-intro">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Surface expertise</span>
              <h2>Every layer. Every line. One standard.</h2>
            </div>
            <p>
              New pavement, protective sealer, precise striping, and targeted repairs—planned as
              one complete surface system.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <Link className="service-card" href={`/${service.slug}`} key={service.slug}>
                <div className="service-image-wrap">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span className="text-link">
                    Explore service <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container why-grid">
          <div className="why-image">
            <Image
              src="/assets/asphalt-pattern.jpg"
              alt="Detailed close-up of asphalt aggregate"
              fill
              sizes="(max-width: 850px) 100vw, 50vw"
            />
            <div className="why-badge">
              <span>FORD</span>
              <strong>Precision under pressure.</strong>
            </div>
          </div>
          <div className="why-copy">
            <span className="eyebrow">Why Ford</span>
            <h2>The finish is visible. The preparation makes it last.</h2>
            <p className="lead">
              Good pavement should look clean on day one and make sense for the property long
              after. That starts with listening, honest recommendations, and disciplined prep.
            </p>
            <ol className="process-list">
              <li>
                <span>01</span>
                <div>
                  <h3>Walk the surface</h3>
                  <p>We start with the property, the traffic, the drainage, and the real problem.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Build the right plan</h3>
                  <p>You get a clear path forward—not a one-size-fits-all recommendation.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Finish with intention</h3>
                  <p>Edges, transitions, markings, and cleanup receive the same attention.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section home-form-section">
        <div className="container home-form-grid">
          <div className="form-side-copy">
            <span className="eyebrow eyebrow--light">Free estimates</span>
            <h2>A better surface starts with a quick conversation.</h2>
            <p>
              Whether you know exactly what you need or just know the pavement needs attention,
              send the details. We’ll help sort out the next step.
            </p>
            <a href={phoneHref} className="big-phone">
              {phoneDisplay}
            </a>
          </div>
          <EstimateForm />
        </div>
      </section>

      <EstimateBand />
    </PageShell>
  );
}

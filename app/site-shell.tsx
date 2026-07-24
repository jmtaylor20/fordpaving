import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { email, navItems, phoneDisplay, phoneHref, services } from "./site-data";

export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <p>Professional asphalt paving & pavement maintenance</p>
          <div>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="Ford Paving and Sealing home">
            <Image
              src="/assets/logo-main.jpg"
              alt="Ford Paving and Sealing"
              width={640}
              height={344}
              priority
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button button--primary header-cta" href="/contact">
            Free estimate <span aria-hidden="true">↗</span>
          </Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <a href={phoneHref}>Call {phoneDisplay}</a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-texture" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/assets/logo-phone.png" alt="Ford Paving and Sealing" width={851} height={613} />
          <p>
            Professional asphalt paving, sealcoating, striping, thermoplastic markings, and
            pavement repair.
          </p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <nav>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <span className="footer-label">Services</span>
          <nav>
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <span className="footer-label">Start a project</span>
          <a className="footer-phone" href={phoneHref}>
            {phoneDisplay}
          </a>
          <a href={`mailto:${email}`}>{email}</a>
          <Link className="text-link" href="/contact">
            Request a free estimate <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Ford Paving & Sealing. All rights reserved.</p>
        <p>Asphalt done right. From first grade to final stripe.</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image = "/assets/asphalt-pattern.jpg",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
}) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero-overlay" />
      <div className="lane-line lane-line--one" aria-hidden="true" />
      <div className="lane-line lane-line--two" aria-hidden="true" />
      <div className="container page-hero-content">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

export function EstimateBand() {
  return (
    <section className="estimate-band">
      <div className="estimate-band-texture" aria-hidden="true" />
      <div className="container estimate-band-inner">
        <div>
          <span className="eyebrow eyebrow--light">Your next surface starts here</span>
          <h2>Let’s put a better finish on your property.</h2>
        </div>
        <Link className="button button--white" href="/contact">
          Get a free estimate <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}


import { Link } from "react-router-dom";
import { content } from "../data/content";
import { destinations } from "../data/destinations";
import { packages } from "../data/packages";
import PackageCard from "../components/PackageCard";

export default function Home() {
  const featured = packages.slice(0, 3);

  return (
    <>
      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2200&q=90" alt="" />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">{content.home.eyebrow}</span>
          <h1>{content.home.title}<br /><span>{content.heroTagline}</span></h1>
          <p>{content.home.subtitle}</p>
          <Link className="button button-light" to="/packages">{content.home.cta}<span aria-hidden="true"> →</span></Link>
          <div className="hero-note"><span className="avatar-stack" aria-hidden="true"><i>✦</i><i>⌂</i><i>◉</i></span><span>{content.heroNote}</span></div>
        </div>
        <div className="hero-caption"><span>{content.heroCoordinates}</span><span>{content.heroLocation}</span></div>
      </section>

      <section className="page-wrap home-section">
        <div className="section-heading">
          <div><span className="eyebrow">{content.home.featured}</span><h2>{content.home.destinationsTitle}</h2><p>{content.home.destinationsSubtitle}</p></div>
          <Link className="text-link" to="/destinations">{content.home.exploreDestinations} <span aria-hidden="true">→</span></Link>
        </div>
        <div className="destination-strip">
          {destinations.slice(0, 3).map((destination) => (
            <Link className="destination-tile" to={`/destinations?search=${encodeURIComponent(destination.name)}`} key={destination.id} style={{ "--tile-image": `url("${destination.image}")` }}>
              <span className="tile-category">{destination.category}</span>
              <span className="tile-name">{destination.name}</span>
              <span className="tile-region">{destination.region} <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="page-wrap">
          <div className="section-heading">
            <div><span className="eyebrow">{content.common.featured}</span><h2>{content.home.featured}</h2><p>{content.home.destinationsSubtitle}</p></div>
            <Link className="text-link" to="/packages">{content.home.viewAll} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="package-grid">{featured.map((tourPackage) => <PackageCard key={tourPackage.id} tourPackage={tourPackage} featured />)}</div>
        </div>
      </section>

      <section className="page-wrap why-section">
        <div className="why-copy"><span className="eyebrow">{content.brand}</span><h2>{content.home.whyTitle}</h2><p>{content.home.whySubtitle}</p></div>
        <ul className="benefit-list">{content.home.benefits.map((benefit, index) => <li key={benefit}><span className="benefit-number">0{index + 1}</span>{benefit}<span className="benefit-check" aria-hidden="true">✓</span></li>)}</ul>
      </section>
    </>
  );
}

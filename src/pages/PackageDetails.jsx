import { Link, useParams } from "react-router-dom";
import { packages } from "../data/packages";
import { destinations } from "../data/destinations";
import { content } from "../data/content";

export default function PackageDetails() {
  const { id } = useParams();
  const tourPackage = packages.find((item) => item.id === Number(id));
  if (!tourPackage) return <section className="page-wrap"><div className="empty-state"><h1>{content.details.notFound}</h1><Link className="button button-primary" to="/packages">{content.details.back}</Link></div></section>;

  const destination = destinations.find((item) => item.id === tourPackage.destinationId);
  return (
    <section className="page-wrap detail-page">
      <Link className="back-link" to="/packages">← {content.details.back}</Link>
      <div className="detail-hero"><img src={destination?.image} alt={destination?.name ?? tourPackage.title} /><div className="detail-hero-shade" /><div className="detail-heading"><span className="eyebrow">{destination?.region} · {destination?.category}</span><h1>{tourPackage.title}</h1><p>{destination?.description}</p></div></div>
      <div className="detail-layout">
        <div className="itinerary-panel"><span className="eyebrow">{content.details.itinerary}</span><h2>{content.home.sectionTitle}</h2><ol className="itinerary-list">{tourPackage.itinerary.map((item, index) => <li key={item}><span className="itinerary-number">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}</ol></div>
        <aside className="booking-card"><span className="eyebrow">{content.details.destination}</span><h2>{destination?.name}</h2><div className="booking-card-meta"><span>◷ {tourPackage.durationDays} {content.details.days}</span><span>⌖ {destination?.region}</span></div><div className="price-line"><strong>{content.common.currency} {tourPackage.price.toLocaleString()}</strong><span>{content.details.perGuest}</span></div><Link className="button button-primary button-full" to={`/booking/${tourPackage.id}`}>{content.details.bookNow}<span aria-hidden="true"> →</span></Link></aside>
      </div>
    </section>
  );
}

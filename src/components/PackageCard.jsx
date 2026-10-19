import { Link } from "react-router-dom";
import { destinations } from "../data/destinations";
import { content } from "../data/content";

export default function PackageCard({ tourPackage, featured = false }) {
  const destination = destinations.find((item) => item.id === tourPackage.destinationId);

  return (
    <article className="package-card">
      <Link className="package-image-link" to={`/packages/${tourPackage.id}`} aria-label={`${content.common.viewDetails}: ${tourPackage.title}`}>
        <img className="package-image" src={destination?.image} alt={destination?.name ?? tourPackage.title} loading="lazy" />
        {featured && <span className="image-badge">{content.common.featured}</span>}
      </Link>
      <div className="package-card-body">
        <p className="card-location"><span aria-hidden="true">{content.common.locationSymbol}</span> {destination?.name ?? ""} <span>·</span> {destination?.region ?? ""}</p>
        <h3><Link to={`/packages/${tourPackage.id}`}>{tourPackage.title}</Link></h3>
        <div className="card-meta"><span>{content.common.timeSymbol} {tourPackage.durationDays} {content.details.days}</span><span>{content.common.currency} {tourPackage.price.toLocaleString()} {content.details.perGuest}</span></div>
        <Link className="text-link" to={`/packages/${tourPackage.id}`}>{content.common.viewDetails} <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}

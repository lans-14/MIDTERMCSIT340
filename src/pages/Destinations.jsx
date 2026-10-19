import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { content } from "../data/content";
import { destinations } from "../data/destinations";
import { packages } from "../data/packages";

export default function Destinations() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(content.destinationsPage.allCategories);
  const categories = [content.destinationsPage.allCategories, ...new Set(destinations.map((destination) => destination.category))];
  const filtered = useMemo(() => destinations.filter((destination) => {
    const matchesQuery = `${destination.name} ${destination.region} ${destination.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === content.destinationsPage.allCategories || destination.category === category);
  }), [query, category]);

  return (
    <section className="page-wrap listing-page">
      <div className="page-intro"><span className="eyebrow">{content.destinationsPage.eyebrow}</span><h1>{content.destinationsPage.title}</h1><p>{content.destinationsPage.subtitle}</p></div>
      <div className="filter-bar">
        <label className="search-field"><span aria-hidden="true">⌕</span><input aria-label={content.destinationsPage.searchPlaceholder} placeholder={content.destinationsPage.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="chip-list" aria-label={content.destinationsPage.allCategories}>{categories.map((item) => <button className={`filter-chip${category === item ? " selected" : ""}`} key={item} type="button" onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      {filtered.length ? <div className="destination-grid">{filtered.map((destination) => {
        const count = packages.filter((item) => item.destinationId === destination.id).length;
        return <article className="destination-card" key={destination.id}>
          <div className="destination-card-image"><img src={destination.image} alt={destination.name} loading="lazy" /><span className="image-badge">{destination.category}</span></div>
          <div className="destination-card-body"><div className="destination-card-title"><div><span className="card-location">{destination.region}</span><h2>{destination.name}</h2></div><span className="destination-arrow" aria-hidden="true">↗</span></div><p>{destination.description}</p><Link className="text-link" to={`/packages?destination=${destination.id}`}>{content.destinationsPage.explore}<span aria-hidden="true"> →</span>{count > 0 && <span className="package-count"> · {count}</span>}</Link></div>
        </article>;
      })}</div> : <div className="empty-state"><p>{content.destinationsPage.empty}</p></div>}
    </section>
  );
}

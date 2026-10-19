import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { content } from "../data/content";
import { packages } from "../data/packages";

export default function Packages() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("any");
  const [duration, setDuration] = useState("any");
  const selectedDestination = searchParams.get("destination");
  const durations = [...new Set(packages.map((item) => item.durationDays))].sort((a, b) => a - b);
  const priceOptions = [3000, 5000, 7000];
  const filtered = packages.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesPrice = maxPrice === "any" || item.price <= Number(maxPrice);
    const matchesDuration = duration === "any" || item.durationDays === Number(duration);
    const matchesDestination = !selectedDestination || item.destinationId === Number(selectedDestination);
    return matchesQuery && matchesPrice && matchesDuration && matchesDestination;
  });

  return (
    <section className="page-wrap listing-page">
      <div className="page-intro"><span className="eyebrow">{content.packagesPage.eyebrow}</span><h1>{content.packagesPage.title}</h1><p>{content.packagesPage.subtitle}</p></div>
      <div className="filter-bar package-filters">
        <label className="search-field"><span aria-hidden="true">⌕</span><input aria-label={content.packagesPage.searchPlaceholder} placeholder={content.packagesPage.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="select-field"><span>{content.packagesPage.maxPrice}</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="any">{content.packagesPage.allPrices}</option>{priceOptions.map((price) => <option value={price} key={price}>{content.packagesPage.under} {content.common.currency} {price.toLocaleString()}</option>)}</select></label>
        <label className="select-field"><span>{content.details.duration}</span><select value={duration} onChange={(event) => setDuration(event.target.value)}><option value="any">{content.packagesPage.allDurations}</option>{durations.map((days) => <option value={days} key={days}>{days} {content.details.days}</option>)}</select></label>
      </div>
      <p className="results-count">{filtered.length} {content.packagesPage.results}</p>
      {filtered.length ? <div className="package-grid">{filtered.map((tourPackage) => <PackageCard key={tourPackage.id} tourPackage={tourPackage} />)}</div> : <div className="empty-state"><p>{content.packagesPage.empty}</p></div>}
    </section>
  );
}

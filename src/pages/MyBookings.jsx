import { useState } from "react";
import { Link } from "react-router-dom";
import { getBookings, saveBookings } from "../data/bookings";
import { packages } from "../data/packages";
import { destinations } from "../data/destinations";
import { content } from "../data/content";

export default function MyBookings() {
  const [bookings, setBookings] = useState(getBookings);

  function cancelBooking(id) {
    const updated = bookings.map((booking) => booking.id === id ? { ...booking, status: "Cancelled" } : booking);
    saveBookings(updated);
    setBookings(updated);
  }

  return (
    <section className="page-wrap listing-page">
      <div className="page-intro"><span className="eyebrow">{content.myBookings.eyebrow}</span><h1>{content.myBookings.title}</h1><p>{content.myBookings.subtitle}</p></div>
      {bookings.length === 0 ? <div className="empty-state"><span className="empty-icon" aria-hidden="true">✦</span><h2>{content.myBookings.empty}</h2><p>{content.myBookings.emptyDetail}</p><Link className="button button-primary" to="/packages">{content.myBookings.browse}<span aria-hidden="true"> →</span></Link></div> : <div className="my-booking-list">{bookings.slice().reverse().map((booking) => {
        const tourPackage = packages.find((item) => item.id === booking.packageId);
        const destination = destinations.find((item) => item.id === tourPackage?.destinationId);
        if (!tourPackage) return null;
        const isCancelled = booking.status === "Cancelled";
        return <article className={`my-booking-card${isCancelled ? " is-cancelled" : ""}`} key={booking.id}>
          <img src={destination?.image} alt={destination?.name ?? tourPackage.title} />
          <div className="my-booking-info"><span className="card-location">{destination?.name} · {destination?.region}</span><h2>{tourPackage.title}</h2><p>{content.myBookings.travelDate}: {new Date(`${booking.date}T00:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} <span>·</span> {booking.guests} {content.myBookings.guestCount}</p></div>
          <div className="my-booking-actions"><span className={`status-pill${isCancelled ? " status-cancelled" : ""}`}>{isCancelled ? content.myBookings.cancelled : content.myBookings.confirmed}</span>{!isCancelled && <button className="cancel-button" type="button" onClick={() => cancelBooking(booking.id)}>{content.myBookings.cancel}</button>}</div>
        </article>;
      })}</div>}
    </section>
  );
}

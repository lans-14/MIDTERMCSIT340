import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookingModel from "../models/Booking";
import { currentTraveler } from "../data/travelers";
import { getBookings, saveBookings } from "../data/bookings";
import { packages } from "../data/packages";
import { destinations } from "../data/destinations";
import { content } from "../data/content";

const minimumTravelDate = new Date().toLocaleDateString("en-CA");

function createBooking(tourPackage, travelerId, date, guests) {
  return new BookingModel(Date.now(), tourPackage.id, travelerId, date, guests);
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tourPackage = packages.find((item) => item.id === Number(id));
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  if (!tourPackage) return <section className="page-wrap"><div className="empty-state"><h1>{content.booking.notFound}</h1><Link className="button button-primary" to="/packages">{content.details.back}</Link></div></section>;

  const destination = destinations.find((item) => item.id === tourPackage.destinationId);
  const total = tourPackage.getTotal(Number(guests));

  function handleSubmit(event) {
    event.preventDefault();
    const booking = createBooking(tourPackage, currentTraveler.id, date, Number(guests));
    saveBookings([...getBookings(), booking]);
    setConfirmed(true);
  }

  if (confirmed) return <section className="page-wrap"><div className="success-panel"><span className="success-icon" aria-hidden="true">✓</span><span className="eyebrow">{content.booking.eyebrow}</span><h1>{content.booking.success}</h1><p>{content.booking.successDetail}</p><button className="button button-primary" type="button" onClick={() => navigate("/my-bookings")}>{content.booking.viewBookings}<span aria-hidden="true"> →</span></button></div></section>;

  return (
    <section className="page-wrap booking-page">
      <div className="page-intro"><span className="eyebrow">{content.booking.eyebrow}</span><h1>{content.booking.title}</h1></div>
      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <label className="form-label">{content.booking.date}<input required type="date" min={minimumTravelDate} value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <label className="form-label">{content.booking.guests}<select value={guests} onChange={(event) => setGuests(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6].map((amount) => <option key={amount} value={amount}>{amount} {content.myBookings.guestCount}</option>)}</select></label>
          <div className="booking-total"><span>{content.booking.total}</span><strong>{content.common.currency} {total.toLocaleString()}</strong></div>
          <button className="button button-primary button-full" type="submit">{content.booking.confirm}<span aria-hidden="true"> →</span></button>
          <p className="secure-note">✓ {content.booking.secureNote}</p>
        </form>
        <aside className="trip-summary"><img src={destination?.image} alt={destination?.name ?? tourPackage.title} /><div className="trip-summary-body"><span className="eyebrow">{content.booking.summary}</span><h2>{tourPackage.title}</h2><p>{destination?.name} · {tourPackage.durationDays} {content.details.days}</p><strong>{content.common.currency} {tourPackage.price.toLocaleString()} <span>{content.details.perGuest}</span></strong></div></aside>
      </div>
    </section>
  );
}

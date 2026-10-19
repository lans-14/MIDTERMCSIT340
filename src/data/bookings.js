const storageKey = "cebu-escapes-bookings";

export function getBookings() {
  const saved = window.localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
}

export function saveBookings(bookings) {
  window.localStorage.setItem(storageKey, JSON.stringify(bookings));
}

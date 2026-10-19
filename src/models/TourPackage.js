export default class TourPackage {
  constructor(id, title, destinationId, price, durationDays, itinerary) {
    this.id = id;
    this.title = title;
    this.destinationId = destinationId;
    this.price = price;
    this.durationDays = durationDays;
    this.itinerary = itinerary;
  }

  getTotal(guests) {
    return this.price * guests;
  }
}

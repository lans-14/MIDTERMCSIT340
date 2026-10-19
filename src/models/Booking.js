export default class Booking {
  constructor(id, packageId, travelerId, date, guests, status = "Confirmed") {
    this.id = id;
    this.packageId = packageId;
    this.travelerId = travelerId;
    this.date = date;
    this.guests = guests;
    this.status = status;
  }

  cancel() {
    this.status = "Cancelled";
  }
}

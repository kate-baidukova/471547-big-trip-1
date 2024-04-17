export default class TripModel {
  #points = null;

  constructor(service) {
    this.service = service;
    this.#points = this.service.getPoints();
  }

  get points() {
    return this.#points;
  }
}

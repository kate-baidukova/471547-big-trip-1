export default class DestinationsModel {

  #destinations = null;

  constructor(service) {
    this.service = service;
    this.#destinations = this.service.getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}

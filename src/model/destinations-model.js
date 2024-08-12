export default class DestinationsModel {
  #service = null;
  #destinations = [];

  constructor(service) {
    this.#service = service;
  }

  async init() {
    this.#destinations = await this.#service.destinations;
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id) || null;
  }
}

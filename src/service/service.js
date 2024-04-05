import {POINTS_TYPES} from '../const.js';
import {POINTS_COUNT, OFFERS_COUNT} from '../mock/mock-const.js';
import {DESTINATIONS_COUNT} from '../const.js';
import {getRandomArrayElement, getRandomNumber} from '../mock/mock-utils.js';
import {createDestination} from '../mock/mock-destination.js';
import {createOffer} from '../mock/mock-offer.js';
import {createPoint} from '../mock/mock-point.js';
export default class MockData {

  destinations = [];
  offers = [];
  points = [];

  constructor() {

    this.destinations = this.collectDestinations();
    this.offers = this.collectOffers();
    this.points = this.collectPoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  collectDestinations() {
    return Array.from({length: DESTINATIONS_COUNT}, () => createDestination());
  }

  collectOffers() {
    return POINTS_TYPES.map((type) => ({
      type,
      offers: Array.from({length: getRandomNumber(1, getRandomNumber(1, OFFERS_COUNT))}, () => createOffer()),
    }));
  }

  collectPoints() {
    return Array.from({length: POINTS_COUNT}, () => {

      const type = getRandomArrayElement(POINTS_TYPES);
      const destinationId = getRandomArrayElement(this.destinations).id;
      const hasOffers = getRandomNumber(0, 1);

      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offersIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomNumber(0, OFFERS_COUNT))
          .map((offer) => offer.id)
        : [];

      return createPoint(type, offersIds, destinationId);
    });
  }
}

import {POINTS_TYPES} from '../const.js';

import {DESTINATIONS, POINTS_COUNT, OFFERS_COUNT} from '../mock/mock-const.js';
import {getRandomArrayElement, getRandomNumber} from '../mock/mock-utils.js';
import {createDestination} from '../mock/mock-destination.js';
import {createOffer} from '../mock/mock-offer.js';
import {createPoint} from '../mock/mock-point.js';

const destinationCount = getRandomNumber(1, DESTINATIONS.length);

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
    return Array.from({length: destinationCount}, () => createDestination());
  }

  collectOffers() {
    return POINTS_TYPES.map((type) => ({
      type,
      offers: Array.from({length: getRandomNumber(1, getRandomNumber(0, OFFERS_COUNT))}, () => createOffer()),
    }));
  }

  collectPoints() {
    return Array.from({length: POINTS_COUNT}, () => {

      const type = getRandomArrayElement(POINTS_TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const hasOffers = getRandomNumber(0, 1);

      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offersIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomNumber(0, OFFERS_COUNT))
          .map((offer) => offer.id)
        : [];

      return createPoint(type, offersIds, destination.id);
    });
  }
}

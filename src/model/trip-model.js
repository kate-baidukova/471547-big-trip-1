import {getRandomTrip} from '../mock/trip.js';
import {POINT_COUNT} from '../mock/const.js';

export default class TripModel {
  destinations = Array.from({lengh: POINT_COUNT}, getRandomTrip);

  getDestination() {
    return this.destinations;
  }
}

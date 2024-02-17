import {render} from '../src/render.js';
import TripEventsList from '../view/trip-list-view.js';
import TripEvent from '../view/trip-event-view.js';

const POINT_COUNT = 3;

export default class TripPresenter {
  tripListComponent = new TripEventsList();

  constructor ({mainTripEventsContainer}) {
    this.mainTripEventsContainer = mainTripEventsContainer;
  }

  init () {
    render(this.tripListComponent, this.mainTripEventsContainer);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new TripEvent(), this.tripListComponent.getElement());
    }
  }
}

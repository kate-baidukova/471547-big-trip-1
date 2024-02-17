import {render, RenderPosition} from '../src/render.js';
import TripEventsList from '../view/trip-list-view.js';
import TripEvent from '../view/trip-event-view.js';
import FormPointAdd from '../view/point-form-new-view.js';
import FormPointEdit from '../view/point-edit-form-view.js';

const POINT_COUNT = 3;

export default class TripPresenter {
  tripListComponent = new TripEventsList();

  constructor ({mainTripEventsContainer}) {
    this.mainTripEventsContainer = mainTripEventsContainer;
  }

  init () {
    render(new FormPointAdd, this.mainTripEventsContainer, RenderPosition.BEFOREEND);
    render(new FormPointEdit, this.mainTripEventsContainer, RenderPosition.BEFOREEND);
    render(this.tripListComponent, this.mainTripEventsContainer);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new TripEvent, this.tripListComponent.getElement());
    }
  }
}

import {render, RenderPosition} from '../render.js';

import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventElementView from '../view/trip-event-view.js';
import NewPointFormView from '../view/new-point-form-view.js';
import PointEditFormView from '../view/point-form-editing-view.js';
import ListSortingView from '../view/sorting-list-view.js';

const POINT_COUNT = 3;

export default class TripPresenter {
  tripListComponent = new TripEventsListView();

  constructor ({mainContentContainer}) {
    this.mainContentContainer = mainContentContainer;
  }

  init () {
    render(new ListSortingView, this.mainContentContainer, RenderPosition.BEFOREEND);
    render(new NewPointFormView, this.mainContentContainer, RenderPosition.BEFOREEND);
    render(this.tripListComponent, this.mainContentContainer);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new TripEventElementView, this.tripListComponent.getElement());
    }

    render(new PointEditFormView, this.mainContentContainer, RenderPosition.BEFOREEND);
  }
}

import {render, RenderPosition} from '../src/render.js';
import TripEventsList from '../view/trip-list-view.js';
//import TripPointCard from '../view/trip-point-view.js';

export default class TripEventsPresenter {
  constructor ({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init () {
    for (let i = 0; i < 3; i++) {
      render (new TripEventsList, this.boardContainer, RenderPosition.BEFOREEND);
    }
  }
}


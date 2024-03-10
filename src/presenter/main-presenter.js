import {render, RenderPosition} from '../render.js';

import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventElementView from '../view/trip-event-view.js';
import NewPointFormView from '../view/new-point-form-view.js';
import ListSortingView from '../view/sorting-list-view.js';

export default class TripPresenter {

  constructor ({mainContentContainer, destinationsModel, offersModel, pointsModel}) {

    this.mainContentContainer = mainContentContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
  }

  init () {

    this.destination = [...this.destinationsModel.get()];
    this.offers = [...this.offersModel.get()];
    this.points = [...this.pointsModel.get()];

    this.sortingComponent = new ListSortingView();//сортировка
    this.tripListComponent = new TripEventsListView();//ul
    this.eventListItemComponent = new TripEventElementView();//li

    let destinationId = this.points[0].destination;
    let type = this.points[0].type;

    let destination = this.destinationsModel.getById(destinationId);
    let offers = this.offersModel.getByType(type);

    this.formComponent = new NewPointFormView({point: this.points[0], offers: offers, destination: destination});

    render(this.sortingComponent, this.mainContentContainer, RenderPosition.BEFOREEND);
    render(this.tripListComponent, this.mainContentContainer);
    render(this.eventListItemComponent, this.tripListComponent.getElement());
    render(this.formComponent, this.eventListItemComponent.getElement()); //определяем форму в первый li

    for (let i = 1; i < this.points.length; i++) {
      destinationId = this.points[i].length; i++;
      destination = this.destinationsModel.getById(destinationId);
      type = this.points[i].type;
      offers = this.offersModel.getByType(type);

      render(this.eventListItemComponent, this.tripListComponent.getElement());
      render(new Event({point: this.points[i], offers: offers, destination: destination}), this.tripListComponent.getElement().lastElementChild);
    }
  }
}

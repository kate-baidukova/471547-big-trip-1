import {render, RenderPosition} from '../render.js';

import TripPointsListView from '../view/points-list-view.js';
import TripPointView from '../view/point-view.js';
import NewPointView from '../view/new-point-form-view.js';
import PointsListItem from '../view/points-item-view.js';
import ListSortingView from '../view/sorting-list-view.js';

export default class MainPresenter {

  sortingComponent = new ListSortingView();//сортировка
  pointsListComponent = new TripPointsListView();//ul
  pointItemComponent = new PointsListItem();//li, без наполнения

  constructor ({mainContentContainer, destinationModel, offersModel, tripModel}) {

    this.mainContentContainer = mainContentContainer;
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.tripModel = tripModel;

    this.points = [...this.tripModel.get()];
  }

  init() {

    render(this.sortingComponent, this.mainContentContainer, RenderPosition.BEFOREEND); //сортировка
    render(this.pointsListComponent, this.mainContentContainer); //список поинтов определяем в общ. контейнер
    render(this.pointItemComponent, this.pointsListComponent.getElement()); //вставляем li в общий список поинтов

    render (
      new NewPointView({
        point: this.points[0],
        offers:  this.offersModel.get(),
        destination: this.destinationModel.get(),
      }),
      this.pointItemComponent.getElement()
    ); //определяем форму в первый li

    this.points.forEach((point) => {
      render(
        new TripPointView ({
          point,
          pointDestination: this.destinationModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type),
        }),
        this.pointsListComponent.getElement()
      ); //рендерим поинт в li
    });
  }
}

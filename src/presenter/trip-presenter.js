import {render, RenderPosition} from '../render.js';

import PointsListView from '../view/points-list-view.js';
import PointFormView from '../view/point-form-view.js';
import TripView from '../view/trip-view.js';
import PointItem from '../view/point-item-view.js';
import SortingView from '../view/sorting-view.js';

export default class TripPresenter {

  sortingComponent = new SortingView();//сортировка
  pointsListComponent = new PointsListView();//ul
  pointItemComponent = new PointItem();//li, без наполнения

  constructor({mainContentContainer, destinationsModel, offersModel, tripModel}) {

    this.mainContentContainer = mainContentContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.tripModel = tripModel;

    this.points = [...this.tripModel.get()];
  }

  init() {

    render(this.sortingComponent, this.mainContentContainer, RenderPosition.BEFOREEND); //сортировка
    render(this.pointsListComponent, this.mainContentContainer); //список поинтов определяем в общ. контейнер
    render(this.pointItemComponent, this.pointsListComponent.getElement()); //вставляем li в список поинтов

    render (
      new PointFormView({
        point: this.points[0],
        pointOffers: this.offersModel.getByType(this.points[0].type),
        pointDestination: this.destinationsModel.getById(this.points[0].destination),
      }),
      this.pointItemComponent.getElement()
    ); //определяем форму в первый li


    this.points.forEach((point) => {
      render(
        new TripView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.pointsListComponent.getElement()
      ); //рендерим поинт (закрытая карточка) в li
    });
  }
}

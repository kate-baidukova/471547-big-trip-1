import {render, RenderPosition, replace} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointFormView from '../view/point-form-view.js';
import TripView from '../view/trip-view.js';
import PointItem from '../view/point-item-view.js';
import SortingView from '../view/sorting-view.js';
import NoEventsMessage from '../view/no-events.js';

export default class TripPresenter {
  #mainContentContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortingComponent = new SortingView();//сортировка
  #pointsListComponent = new PointsListView();//ul
  #pointItemComponent = new PointItem();//li, без наполнения
  #noEventsComponent = new NoEventsMessage();


  #points = [];

  constructor({mainContentContainer, destinationsModel, offersModel, tripModel}) {
    this.#mainContentContainer = mainContentContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...tripModel.get()];
  }

  init() {
    render(this.#sortingComponent, this.#mainContentContainer, RenderPosition.BEFOREEND); //сортировка
    render(this.#pointsListComponent, this.#mainContentContainer); //список поинтов определяем в общ. контейнер
    render(this.#pointItemComponent, this.#pointsListComponent.element); //вставляем li в список поинтов

    this.#renderPoints(this.#points);
  }

  #renderPoints() {

    if (this.#points.length < 1) {
      render(this.#noEventsComponent, this.#mainContentContainer); //вывод сообщения, если нет поинтов
      return;
    }

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const tripView = new TripView({
      point,
      pointOffers: this.#offersModel.getByType(point.type),
      pointDestination: this.#destinationsModel.getById(point.destination),

      onEditClick: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', ifEscKeyDownHandler);
      }
    });

    const editPoint = new PointFormView({
      point: this.#points[0],
      pointOffers: this.#offersModel.getByType(this.#points[0].type),
      pointDestination: this.#destinationsModel.getById(this.#points[0].destination),
      destinations: this.#destinationsModel.get(),

      onFormSubmit: () => {
        replacePointToForm();
        document.removeEventListener('keydown', ifEscKeyDownHandler);
      },

      onCloseEditFormButton: () => {
        replacePointToForm();
      }
    });

    function ifEscKeyDownHandler(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replacePointToForm();
        document.removeEventListener('keydown', ifEscKeyDownHandler);
      }
    }

    function replaceFormToPoint() {
      replace(editPoint, tripView);
    }

    function replacePointToForm() {
      replace(tripView, editPoint);
    }

    render(tripView, this.#pointItemComponent.element);
  }
}

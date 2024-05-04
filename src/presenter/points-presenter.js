import {render} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';
import MessageView from '../view/message.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
import SortingView from '../view/sorting-view.js';

export default class PointsPresenter {
  #eventsContainerElement = null;
  #destinationsModel = null;
  #tripModel = null;
  #offersModel = null;

  #tripListComponent = new PointsListView();

  #points = [];

  #pointsPresenter = new Map();

  constructor({eventsContainerElement, destinationsModel, tripModel, offersModel}) {
    this.#eventsContainerElement = eventsContainerElement;
    this.#destinationsModel = destinationsModel;
    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#tripModel.get()];

    if (!this.#points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  }

  #onDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
    render(new SortingView(), this.#eventsContainerElement);
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#eventsContainerElement);
    this.#renderPoints();
  }

  #onModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    render(new MessageView(), this.#eventsContainerElement);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#tripListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#onDataChange,
      onModeChange: this.#onModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }
}

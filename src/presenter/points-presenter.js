import {render} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';
import MessageView from '../view/message.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import {SortTypes} from '../const.js';
import {sorting} from '../utils/utils.js';
export default class PointsPresenter {
  #eventsContainerElement = null;
  #destinationsModel = null;
  #tripModel = null;
  #offersModel = null;

  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;

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

    if (this.#points.length) {
      this.#renderSort();
      this.#renderTripList();
    } else {
      this.#renderEmptyList();
    }
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

  #renderSort() {
    const sortComponent = new SortPresenter({
      container: this.#eventsContainerElement,
      sortTypeHandler: this.#handleSortTypeChange,
      defaultSortType: this.#defaultSortType,
    });

    sortComponent.init();
  }

  #sortPointsList(sortType) {
    this.#currentSortType = sortType;
    this.#points = sorting[this.#currentSortType](this.#points);
  }

  #clearPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #onDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPointsList(sortType);
    this.#clearPointsList();
    this.#renderPoints();
  };

  #onModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderTripList() {
    render(this.#tripListComponent, this.#eventsContainerElement);
    this.#handleSortTypeChange(this.#defaultSortType);
  }

  #renderEmptyList() {
    render(new MessageView(), this.#eventsContainerElement);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}

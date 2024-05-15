import {render} from '../framework/render.js';
import {updateItem} from '../utils/utils.js';
import MessageView from '../view/message-view.js';
import PointsListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
import SortingView from '../view/sorting-view.js';
import {SortTypes, EnabledSortTypes} from '../const.js';
import {sorting} from '../utils/utils.js';

export default class PointsPresenter {
  #eventsContainerElement = null;
  #destinationsModel = null;
  #tripModel = null;
  #offersModel = null;

  #currentSortType = null;
  #sortComponent = null;
  #defaultSortType = SortTypes.DAY;
  #sortTypes = [];

  #tripListComponent = new PointsListView();

  #tripPoints = [];
  #pointsPresenter = new Map();

  constructor({eventsContainerElement, destinationsModel, tripModel, offersModel}) {
    this.#eventsContainerElement = eventsContainerElement;
    this.#destinationsModel = destinationsModel;
    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripPoints = [...this.#tripModel.get()];

    if (this.#tripPoints.length) {
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

  #sortPointsList(sortType) {
    this.#currentSortType = sortType;
    this.#tripPoints = sorting[this.#currentSortType](this.#tripPoints);
  }

  #clearPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #onDataChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
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

  #renderSort() {
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === this.#defaultSortType,
      isDisabled: !EnabledSortTypes[type],
    }));

    this.#sortComponent = new SortingView({
      item: this.#sortTypes,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#eventsContainerElement);

  }

  #renderPoints() {
    this.#tripPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}

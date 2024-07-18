import {render, remove} from '../framework/render.js';

import {
  sortPointsByPrice,
  sortPointsByDate,
  sortPointsByTime,
  sorting
} from '../utils/utils.js';

import {
  SortTypes,
  EnabledSortTypes,
  UpdateType,
  UserAction,
  FiltersTypes
} from '../const.js';

import {filter} from '../utils/filter.js';

import PointsView from '../view/points-view.js';
import PointsListView from '../view/points-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import MessageView from '../view/message-view.js';
import SortingView from '../view/sorting-view.js';

import NewPointPresenter from './new-point-presenter.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #eventsContainerElement = null;
  #headerContainerElement = null;

  #tripComponent = new PointsView();
  #tripListComponent = new PointsListView();
  #tripPoints = [];
  #pointsPresenter = new Map();
  #noRoutePointComponent = null;

  #tripModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #newPointPresenter = null;
  #emptyListComponent = null;

  #sortTypes = [];
  #sortComponent = null;
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;

  #filterType = FiltersTypes.EVERYTHING;

  constructor({eventsContainerElement, headerContainerElement, destinationsModel, tripModel, offersModel, filterModel}) {
    this.#eventsContainerElement = eventsContainerElement;
    this.#headerContainerElement = headerContainerElement;

    this.#destinationsModel = destinationsModel;
    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventsContainerElement,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler,
    });

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get routePoints() {
    this.#filterType = this.#filterModel.filter;
    const routePoints = this.#tripModel.points;
    const filteredPoints = filter[this.#filterType](routePoints);

    if (this.#currentSortType === SortTypes.TIME) {
      return filteredPoints.sort(sortPointsByTime);
    }
    if (this.#currentSortType === SortTypes.PRICE) {
      return filteredPoints.sort(sortPointsByPrice);
    }
    if (this.#currentSortType === SortTypes.DAY) {
      return filteredPoints.sort(sortPointsByDate);
    }

    return filteredPoints;
  }

  init() {
    this.#tripPoints = [...this.#tripModel.get()];

    if (this.#tripPoints.length) {
      this.#renderCreatePointButton();
      this.#renderSort();
      this.#renderTripList();
      this.#renderPoints();
    } else {
      this.#renderEmptyList();
    }
  }

  #clearTripForm({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();

    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    remove(this.#sortComponent);
    if (this.#noRoutePointComponent) {
      remove(this.#noRoutePointComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #clearPointsList = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #renderCreatePointButton = () => {
    const newPointButtonComponent = new NewPointButtonView({
      onClick: this.#buttonClickHandler,
    });
    render(newPointButtonComponent, this.#headerContainerElement);
  };

  #handleModelEvent = (updateType, data) => {
    if (updateType === UpdateType.PATCH) {
      this.#pointsPresenter.get(data.id).init(data);
    }
    if (updateType === UpdateType.MINOR) {
      this.#clearTripForm();
      this.#renderTripList();
    }
    if (updateType === UpdateType.MAJOR) {
      this.#clearTripForm({
        resetSortType: true
      });
      this.#renderTripList();
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripModel.deletePoint(updateType, update);
        break;
    }
  };

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

  #renderTripList() {
    render(this.#tripListComponent, this.#eventsContainerElement);
    this.#handleSortTypeChange(this.#defaultSortType);

    if(this.#tripPoints.length === 0) {
      this.#renderEmptyList();

      return;
    }
    this.#renderPoints(this.#tripPoints);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPointsList(sortType);
    this.#clearPointsList();
    this.#renderPoints();
  };

  #onModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderPoints() {
    this.#tripPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    this.#emptyListComponent = new MessageView({
      filterType: this.#filterModel.get(),
    });
    render(this.#emptyListComponent, this.#eventsContainerElement);
  }

  #buttonClickHandler = () => {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersTypes.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #newPointDestroyHandler = () => {

    if(this.#pointsPresenter.length === 0) {
      this.#clearPointsList();
      this.#renderTripList();
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#tripListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#onModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #sortPointsList(sortType) {
    this.#currentSortType = sortType;
    this.#tripPoints = sorting[this.#currentSortType](this.#tripPoints);
  }
}

import {render, remove, RenderPosition} from '../framework/render.js';

import {
  sortPointsByPrice,
  sortPointsByDate,
  sortPointsByTime,
  //sorting
} from '../utils/utils.js';

import {
  SortTypes,
  EnabledSortTypes,
  UpdateType,
  UserAction,
  FiltersTypes
} from '../const.js';

import {filter} from '../utils/filter.js';

//import PointsView from '../view/points-view.js';
import PointsListView from '../view/points-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import MessageView from '../view/message-view.js';
import SortingView from '../view/sorting-view.js';

import NewPointPresenter from './new-point-presenter.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #eventsContainerElement = null;
  #headerContainerElement = null;

  //#tripComponent = new PointsView();
  #tripListComponent = new PointsListView();
  #pointsPresenter = new Map();
  #noRoutePointComponent = null;

  #tripModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #newPointPresenter = null;
  #emptyListComponent = null;
  #newPointButtonComponent = null;

  #sortTypes = [];
  #sortComponent = null;
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;

  #filterType = FiltersTypes.EVERYTHING;

  #isCreating = false;

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
      onNewPointDestroy: this.#newPointDestroyHandler,
    });

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get routePoints() {
    this.#filterType = this.#filterModel.filter;

    const currentPoints = this.#tripModel.points;

    const filteredPoints = filter[this.#filterType](currentPoints);

    //return sorting[this.#currentSortType](filteredPoints);

    switch (this.#currentSortType) {
      case SortTypes.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortTypes.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortTypes.DAY:
        return filteredPoints.sort(sortPointsByDate);
    }

    return filteredPoints;

  }

  init() {
    this.#renderCreatePointButton();
    this.#renderTripList();
    this.#renderSort();
  }

  #clearTripForm({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();

    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

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
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#buttonClickHandler,
    });
    render(this.#newPointButtonComponent, this.#headerContainerElement);
  };

  #buttonClickHandler = () => {
    //this.#isCreating = true;
    this.#newPointButtonComponent.setDisabled();
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersTypes.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #newPointDestroyHandler = () => {
    this.#newPointButtonComponent.setEnabled();
    //this.#isCreating = false;

    if(this.#pointsPresenter.length === 0) {
      this.#clearPointsList();
      this.#renderTripList();
    }
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
        this.#tripModel.update(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripModel.add(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripModel.delete(updateType, update);
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

    render(this.#sortComponent, this.#eventsContainerElement, RenderPosition.BEFOREBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPointsList(sortType);
  };

  #onModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderTripList() {
    render(this.#tripListComponent, this.#eventsContainerElement);

    const points = this.routePoints;

    if(points.length === 0) {
      this.#renderEmptyList();

      return;
    }
    this.#renderPoints(points);
  }

  #renderPoints() {
    this.routePoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    this.#emptyListComponent = new MessageView({
      filterType: this.#filterModel.get(),
    });
    render(this.#emptyListComponent, this.#eventsContainerElement);
  }

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
    //return sorting[this.#currentSortType](this.routePoints);
  }
}

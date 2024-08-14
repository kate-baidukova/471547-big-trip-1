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
  FiltersTypes,
  TimeLimit
} from '../const.js';

import {filter} from '../utils/filter.js';
import LoaderView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

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
  #loadingComponent = new LoaderView();
  #isLoading = true;

  #tripModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #newPointPresenter = null;
  #emptyListComponent = null;
  #newPointButtonComponent = null;

  #sortTypes = [];
  #sortComponent = null;
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;

  #filterType = FiltersTypes.EVERYTHING;

  #isCreating = false;
  #uiBlocker = new UiBlocker({lowerLimit: TimeLimit.LOWER_LIMIT, upperLimit: TimeLimit.UPPER_LIMIT});

  constructor({eventsContainerElement, headerContainerElement, destinationsModel, tripModel, offersModel, filtersModel}) {
    this.#eventsContainerElement = eventsContainerElement;
    this.#headerContainerElement = headerContainerElement;

    this.#destinationsModel = destinationsModel;
    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventsContainerElement,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onNewPointDestroy: this.#newPointDestroyHandler,
    });

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get routePoints() {
    this.#filterType = this.#filtersModel.filter;

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
    this.#newPointPresenter.destroy();

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
    this.#isCreating = true;
    this.#newPointButtonComponent.setDisabled();
    this.#currentSortType = SortTypes.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FiltersTypes.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #newPointDestroyHandler = ({isCanceled}) => {
    this.#newPointButtonComponent.setEnabled();
    this.#isCreating = false;

    if(!this.#pointsPresenter.length && isCanceled) {
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

    if (updateType === UpdateType.INIT) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderTripList();
    }

  };

  #handleViewAction = async (actionType, updateType, update) => {

    this.#uiBlocker.block();

    if (actionType === UserAction.UPDATE_POINT) {
      this.#pointsPresenter.get(update.id).setSaving();
      try {
        await this.#tripModel.update(updateType, update);
      } catch (error) {
        this.#pointsPresenter.get(update.id).setAborting();
      }
    }

    if (actionType === UserAction.ADD_POINT) {
      this.#newPointPresenter.setSaving();
      try {
        await this.#tripModel.add(updateType, update);
        this.#newPointPresenter.destroy({isCanceled: false});
      } catch (error) {
        this.#newPointPresenter.setAborting();
      }
    }

    if (actionType === UserAction.DELETE_POINT) {
      this.#pointsPresenter.get(update.id).setRemove();
      try {
        await this.#tripModel.delete(updateType, update);
      } catch (error) {
        this.#pointsPresenter.get(update.id).setAborting();
      }
    }

    this.#uiBlocker.unblock();
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

    render(this.#sortComponent, this.#eventsContainerElement, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPoints();
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

    if (this.#isLoading) {
      this.#newPointButtonComponent.setDisabled();
      this.#renderLoading();
      return;
    }

    if (points.length === 0 && !this.#isCreating) {
      this.#renderEmptyList();
      return;
    }

    if (!this.#isCreating) {
      this.#newPointButtonComponent.setEnabled();
    }

    this.#renderPoints(points);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsContainerElement);
  }

  #renderPoints() {
    this.routePoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderEmptyList() {
    this.#emptyListComponent = new MessageView({
      filterType: this.#filtersModel.filter,
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

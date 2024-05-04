import {render, replace, remove} from '../framework/render.js';
import {Mode} from '../const.js';
import PointFormEditView from '../view/point-form-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({pointsListContainer, destinationsModel, offersModel, onPointChange, onModeChange}) {
    this.#pointsListContainer = pointsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onPointChange;
    this.#onModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointOffers: this.#offersModel.getByType(point.type),
      pointDestination: this.#destinationsModel.getById(point.destination),
      onEditClick: this.#pointEditHandler,
      onFavouriteClick: this.#pointFavouriteHandler
    });

    this.#editPointComponent = new PointFormEditView({
      point: this.#point,
      pointOffers: this.#offersModel.getByType(this.#point.type),
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      destinations: this.#destinationsModel.get(),
      onFormSubmit: this.#pointEditSubmitHandler,
      onCloseEditFormButton: this.#pointCloseEditHandler,
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #pointEditHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointCloseEditHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointEditSubmitHandler = (point) => {
    this.#replaceFormToPoint();
    this.#onDataChange(point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointFavouriteHandler = () => {
    this.#onDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };
}


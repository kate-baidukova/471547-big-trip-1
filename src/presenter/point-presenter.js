import {render, replace, remove} from '../framework/render.js';
import {Mode, FORM_TYPE, UserAction, UpdateType} from '../const.js';
import {isBigDifference} from '../utils/utils.js';

import PointFormEditView from '../view/point-form-edit-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointsListContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #editPoint = null;
  #destination = null;
  #offer = null;
  #offers = null;
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
    this.#editPoint = this.#point;
    this.#destination = this.#destinationsModel.getById(this.#editPoint.destination);
    this.#offer = this.#offersModel.getByType(this.#editPoint.type);
    this.#offers = this.#offer.offers;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      allOffers: this.#offersModel.get(),
      pointDestination: this.#destination,
      onEditClick: this.#pointEditHandler,
      onFavouriteClick: this.#pointFavouriteHandler
    });

    this.#editPointComponent = new PointFormEditView({
      point: this.#point,
      allOffers: this.#offersModel.get(),
      allDestinations: this.#destinationsModel.get(),
      onFormSubmit: this.#pointEditSubmitHandler,
      onCloseEditFormButton: this.#pointCloseEditHandler,
      onDeletePointSubmit: this.#pointDeleteEditHandler,
      formType: FORM_TYPE.EDITING,
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
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
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
    const isMinorUpdate = isBigDifference(point, this.#point);
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point,
      this.#destination,
      this.#offers);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointDeleteEditHandler = (point) => {
    this.#onDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #pointFavouriteHandler = () => {
    this.#onDataChange(UserAction.UPDATE_POINT,
      UpdateType.PATCH, {...this.#point, isFavourite: !this.#point.isFavourite});
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#editPointComponent.shake();
      return;
    }

    if (this.#mode === Mode.EDITING) {
      const resetFormState = () => {
        this.#editPointComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#editPointComponent.shake(resetFormState);
    }
  };

  setRemove = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };
}


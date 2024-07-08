import {RenderPosition, remove, render} from '../framework/render.js';
import PointFormEditView from '../view/point-form-edit-view.js';
import {EDIT_TYPE, UpdateType, UserAction} from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = [];
  #offersModel = [];

  #addPointComponent = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor ({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onDestroy
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent !== null) {
      return;
    }

    this.#addPointComponent = new PointFormEditView({
      allDestinations: this.#destinationsModel.get(),
      allOffers: this.#offersModel.get(),
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditFormButton: this.#handleCloseEditFormButton,
      formType: EDIT_TYPE.CREATING,
    });

    render(this.#addPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyEventEdit);
  }

  destroy({isCanceled = true}) {
    if (!this.#addPointComponent) {
      return;
    }
    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    this.#onDestroy({isCanceled});
    document.removeEventListener('keydown', this.#escKeyEventEdit);
  }

  #handleCloseEditFormButton = () => {
    this.destroy({isCanceled: true});
  };

  #handleFormSubmit = (point) => {
    this.#onDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy({isCanceled: false});
  };

  #escKeyEventEdit = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy({isCanceled: true});
    }
  };
}

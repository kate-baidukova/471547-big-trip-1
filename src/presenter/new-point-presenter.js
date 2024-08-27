import {RenderPosition, remove, render} from '../framework/render.js';
import PointFormEditView from '../view/point-form-edit-view.js';
import {FORM_TYPE, UpdateType, UserAction} from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = [];
  #offersModel = [];
  #addPointComponent = null;
  #onDataChange = null;
  #handleDestroy = null;

  constructor ({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onNewPointDestroy
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#handleDestroy = onNewPointDestroy;
  }

  init() {
    if (this.#addPointComponent !== null) {
      return;
    }

    this.#addPointComponent = new PointFormEditView({
      allOffers: this.#offersModel.get(),
      allDestinations: this.#destinationsModel.get(),
      onFormSubmit: this.#handleFormSubmit,
      onDeletePointSubmit: this.#handleDeletePointSubmit,
      formType: FORM_TYPE.CREATING,
    });

    render(this.#addPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyEventEdit);
  }

  destroy() {

    if (!this.#addPointComponent) {
      return;

    }

    this.#handleDestroy();
    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyEventEdit);
  }

  setSaving = () => {
    if(!this.#addPointComponent) {
      return;
    }
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#addPointComponent.shake(resetFormState);
  };

  #handleDeletePointSubmit = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#onDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point},
    );
    document.addEventListener('keydown', this.#escKeyEventEdit);
  };

  #escKeyEventEdit = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

}

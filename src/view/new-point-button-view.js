import AbstractView from '../framework/view/abstract-view.js';

function createNewButtonTemplate() {
  return (
    `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `
  );
}

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click' , this.#clickHandler);
  }

  get template() {
    return createNewButtonTemplate();
  }

  setDisabled() {
    this.element.disabled = true;
  }

  setEnabled() {
    this.element.disabled = false;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}

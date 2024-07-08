import AbstractView from '../framework/view/abstract-view.js';
import {EMPTY_LIST_MESSAGE} from '../const.js';

function createNoEventsMessage(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class MessageView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsMessage({
      message: EMPTY_LIST_MESSAGE[this.#filterType.toUpperCase()],
    });
  }
}

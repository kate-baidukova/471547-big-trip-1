import {createElement} from '../render.js';

function createPointListItem() {
  return '<li class="trip-events__item"></li>';
}

export default class PointItem {
  getTemplate () {
    return createPointListItem();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

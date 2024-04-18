import AbstractView from '../framework/view/abstract-view.js';

function createPointListItem() {
  return (`
    <li class="trip-events__item"></li>
  `);
}

export default class PointItem extends AbstractView {
  get template() {
    return createPointListItem();
  }
}

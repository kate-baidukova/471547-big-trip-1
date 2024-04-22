import AbstractView from '../framework/view/abstract-view.js';

function createNoEventsMessage() {
  return (`
  <p class="trip-events__msg">Click New Event to create your first point</p>
  `);
}

export default class NoEventsMessage extends AbstractView {
  get template() {
    return createNoEventsMessage();
  }
}

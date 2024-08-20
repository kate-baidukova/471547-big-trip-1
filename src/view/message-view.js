import AbstractView from '../framework/view/abstract-view.js';
import {FiltersTypes} from '../const.js';

const NoPointsTextType = {
  [FiltersTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FiltersTypes.FUTURE]: 'There are no future events now',
  [FiltersTypes.PRESENT]: 'There are no present events now',
  [FiltersTypes.PAST]: 'There are no past events now',
};

function createNoEventsMessage(filterType) {
  const NoPointTextType = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${NoPointTextType}</p>`;
}

export default class MessageView extends AbstractView {
  #filtersTypes = null;

  constructor({filtersTypes}) {
    super();
    this.#filtersTypes = filtersTypes;
  }

  get template() {
    return createNoEventsMessage(this.#filtersTypes);
  }
}

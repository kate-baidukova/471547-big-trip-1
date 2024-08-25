import AbstractView from '../framework/view/abstract-view.js';
import {FiltersTypes} from '../const.js';

const noPointsTextType = {
  [FiltersTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FiltersTypes.FUTURE]: 'There are no future events now',
  [FiltersTypes.PRESENT]: 'There are no present events now',
  [FiltersTypes.PAST]: 'There are no past events now',
};

function createNoEventsMessage(filterType) {
  const noPointTextType = noPointsTextType[filterType];
  return `<p class="trip-events__msg">${noPointTextType}</p>`;
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

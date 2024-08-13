import Observable from '../framework/observable.js';
import {FiltersTypes} from '../const.js';

export default class FiltersModel extends Observable {
  #filter = FiltersTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}

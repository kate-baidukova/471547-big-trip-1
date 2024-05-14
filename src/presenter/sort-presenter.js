import {render} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import {SortTypes, EnabledSortTypes} from '../const.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #defaultSortType = null;
  #sortTypeChangeHandler = null;

  constructor({container, sortTypeHandler, defaultSortType}) {
    this.#container = container;
    this.#defaultSortType = defaultSortType;
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === this.#defaultSortType,
      isDisabled: !EnabledSortTypes[type],
    }));
    this.#sortTypeChangeHandler = sortTypeHandler;
  }

  init() {
    render(
      new SortingView({
        item: this.#sortTypes,
        onSortTypeChange: this.#sortTypeChangeHandler,
      }),
      this.#container
    );
  }
}

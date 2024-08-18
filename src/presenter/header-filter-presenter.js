import {render, replace} from '../framework/render.js';
import FiltersListView from '../view/filters-list-view.js';
import {UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class HeaderFilterPresenter {
  #tripModel = null;
  #filtersModel = null;
  #filterContainer = null;
  #filterComponent = null;
  #currentFilter = null;

  constructor({filterContainer, tripModel, filtersModel}) {
    this.#tripModel = tripModel;
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;

    this.#tripModel.addObserver(this.#handleModeChange);
    this.#filtersModel.addObserver(this.#handleModeChange);
  }

  get filters() {
    const points = this.#tripModel.points;

    return Object.entries(filter).map(([type, filterFn]) =>
      ({
        type,
        count: filterFn(points).length
      }));
  }

  init() {
    this.#currentFilter = this.#filtersModel.filter;
    const prevFilterComponent = this.#filterComponent;
    const items = this.filters;

    this.#filterComponent = new FiltersListView({
      items,
      onItemChange: this.#filterTypeChangeHandler,
    });

    if (prevFilterComponent) {
      replace(this.#filterComponent, prevFilterComponent);

    } else {
      render(this.#filterComponent, this.#filterContainer);
    }
  }

  #filterTypeChangeHandler = (filtersType) => {
    if (this.#filtersModel.filter === filtersType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filtersType);
  };

  #handleModeChange = () => {
    this.init();
  };
}

import {render, replace, remove} from '../framework/render.js';
import FiltersListView from '../view/filters-list-view.js';
import {generateFilter} from '../mock/mock-filter.js';
import {UpdateType} from '../const.js';

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
    const points = this.#tripModel.get();

    return Object.entries(generateFilter).map(([filterType, filterPoints]) =>
      ({
        type: filterType,
        isChecked: filterType === this.#currentFilter,
        isDisabled: !filterPoints(points).length,
      })
    );
  }

  init() {
    this.#currentFilter = this.#filtersModel.get();
    const preventFilterComponent = this.#filterComponent;
    const items = this.filters;

    this.#filterComponent = new FiltersListView({
      items,
      onItemChange: this.#filterTypeChangeHandler,
    });

    if (preventFilterComponent) {
      replace(this.#filterComponent, preventFilterComponent);
      remove(preventFilterComponent);
    } else {
      render(this.#filterComponent, this.#filterContainer);
    }
  }

  #filterTypeChangeHandler = (filterType) => {
    this.#filtersModel.set(UpdateType.MAJOR, filterType);
  };

  #handleModeChange = () => {
    this.init();
  };
}

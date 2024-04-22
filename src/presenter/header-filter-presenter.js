import {render, RenderPosition} from '../framework/render.js';
import FiltersListView from '../view/filters-list-view.js';
import {generateFilter} from '../mock/mock-filter.js';

export default class HeaderFilterPresenter {
  #points = null;
  #tripModel = null;

  #filtersContainer = document.querySelector('.trip-controls__filters');

  constructor({tripModel}) {
    this.#tripModel = tripModel;
  }

  init() {
    this.#points = [...this.#tripModel.get()];
    const filters = generateFilter(this.#points);

    render(new FiltersListView({filters}), this.#filtersContainer, RenderPosition.BEFOREEND);
  }
}

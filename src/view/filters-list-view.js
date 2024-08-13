import RadioListView from './radio-list.js';

function createFilterItemTemplate(filter, isChecked) {
  const {type, count} = filter;
  return (`
    <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}
          ${isChecked ? 'checked' : ''}
          ${count === 0 ? 'disabled' : ''}">
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
  `);
}

function createFiltersListTemplate(filtersItems) {
  const filtersListTemplate = filtersItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return (`
    <form class="trip-filters" action="#" method="get">
      ${filtersListTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
}

export default class FiltersListView extends RadioListView {
  get template() {
    return createFiltersListTemplate(this._items);
  }
}

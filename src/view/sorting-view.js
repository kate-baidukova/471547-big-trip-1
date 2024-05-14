import AbstractView from '../framework/view/abstract-view.js';

function createSortElementTemplate(types) {
  return types.reduce(
    (markup, {type, isDisabled, isChecked}) => `${markup}
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input
          id="sort-${type}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${type}"
          data-item="${type}"
          ${isDisabled ? 'disabled' : ''}
          ${isChecked ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-${type}">${type}</label>
      </div>
    `,
    ''
  );
}

function createListSortingTemplate(types) {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortElementTemplate(types)}
    </form>
  `);
}

export default class SortingView extends AbstractView {
  #sortTypes = [];
  #handleSortTypeChange = null;

  constructor({item, onSortTypeChange}) {
    super();
    this.#sortTypes = item;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortingTypeChangeHandler);
  }

  #sortingTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange?.(evt.target.dataset.item);
  };

  get template() {
    return createListSortingTemplate(this.#sortTypes);
  }
}

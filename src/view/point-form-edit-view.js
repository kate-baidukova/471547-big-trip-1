import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {POINTS_TYPES, DateFormat, NEW_POINT_FORM} from '../const.js';
import {humanizeDate, capitalizeFirstLetter} from '../utils/utils.js';

//создаем шаблон для типов инвентов/POINTS_TYPES

function createPointsTypeList(types, type) {
  return types.map((item) => (`
    <div class="event__type-item">
      <input
        id="event-type-${item.type}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${item.type}"
        ${item === type ? 'checked' : ''}>
      <label
        class="event__type-label  event__type-label--${item.type}"
        for="event-type-${item.type}">${capitalizeFirstLetter(item)}
      </label>
    </div>
  `)).join('');
}

//создаем шаблон для офферов

function createOffersTemplate(offers, pointOffers) {
  return pointOffers.map((item) => (`
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${item.title}-${item.id}"
        type="checkbox"
        name="event-offer-${item.type}" ${offers.includes(item.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${item.type}-${item.id}">
          <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
        </label>
    </div>
  `)).join('');
}

//создаем шаблон для списка направлений

function createDestinationsList(destinations) {

  return (`
    ${destinations.map((city) => `<option value="${city.name}"></option>`).join('')}
  `);
}

//создаем шаблон для направления

function createDestinationTemplate(pointDestination) {
  const {photos} = pointDestination;
  const photosTemplate = createPhotosTemplate(photos);
  const descriptionTemplate = createDescriptionTemplate(pointDestination);

  return (`
    <section class="event__section  event__section--destination">
      ${descriptionTemplate}
      ${photosTemplate}
    </section>
  `);
}

//создаем шаблон для фото под направление

function createPhotosTemplate(photos) {
  return (`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join('')}
      </div>
    </div>
  `);
}

//создаем описание направления

function createDescriptionTemplate(pointDestination) {
  return (`
    <h3 class="event__section-title  event__section-title--destination">${pointDestination.name}</h3>
    <p class="event__destination-description">${pointDestination.description}</p>
  `);
}

//создаем шаблон поинта

function createEditPointTemplate(point = NEW_POINT_FORM, pointOffers, pointDestination, destinations) {

  const {type, dateFrom, dateTo, price, offers, id} = point;

  const typesList = createPointsTypeList(POINTS_TYPES, type); //получаем список типов ивентов для поинта

  //направления

  const destinationsList = createDestinationsList(destinations); //выбор направления в меню
  const destinationTemplate = createDestinationTemplate(pointDestination); //создаем шаблон для блочка Destination

  //офферы

  const offersList = pointOffers.length ? createOffersTemplate(offers, pointOffers) : ''; //собираем актуальные офферы под поинт

  //время

  const startTimeInForm = humanizeDate(dateFrom, DateFormat.DATE_IN_FORM); //время старта ивента
  const endTimeInForm = humanizeDate(dateTo, DateFormat.DATE_IN_FORM); //время финиша ивента

  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${typesList}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>

          <input
          class="event__input  event__input--destination"
          id="event-destination-${id}"
          type="text" name="event-destination"
          value="${pointDestination ? pointDestination.name : ''}"
          list="destination-list-${id}">
          <datalist id="destination-list-${id}">
          ${destinationsList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input
          class="event__input  event__input--time"
          id="event-start-time-${id}"
          type="text"
          name="event-start-time"
          value="${startTimeInForm}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endTimeInForm}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

            ${offersList}

          </div>
        </section>

        ${destinationTemplate}

      </section>
    </form>
  `);
}

export default class PointFormEditView extends AbstractStatefulView {
  #pointOffers = null;
  #pointDestination = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleCloseEditFormButton = null;
  #handleDeleteClick = null;

  constructor ({point, pointOffers, pointDestination, destinations, onFormSubmit, onCloseEditFormButton, onDeleteClick}) {
    super();
    this._setState(PointFormEditView.parsePointToState(point));
    this.#pointOffers = pointOffers;
    this.#pointDestination = pointDestination;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditFormButton = onCloseEditFormButton;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#pointOffers, this.#pointDestination, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditFormButtonHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  }

  reset(point) {
    this.updateElement(
      PointFormEditView.parsePointToState(point)
    );
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      pointOffers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinations.find((destination) => destination.name === evt.target.value)?.id;
    this.updateElement({
      destination: currentDestination || this._state.pointDestination
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this.updateElement({
      offers: checkedOffers.map((offer) => +offer.dataset.offerId)
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      price: evt.target.value
    });
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointFormEditView.parseStateToPoint(this._state), this.#pointOffers, this.#pointDestination, this.destinations);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeEditFormButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditFormButton();
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}


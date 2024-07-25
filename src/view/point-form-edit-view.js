import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {POINTS_TYPES, NEW_POINT_FORM, DateFormat, FORM_TYPE} from '../const.js';
import {capitalizeFirstLetter, humanizeDate} from '../utils/utils.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


//создаем шаблон для типов инвентов/POINTS_TYPES

function createPointsTypeList(allTypes, currentType) {
  return allTypes.map((pointType) => (`
    <div class="event__type-item">
      <input
        id="event-type-${pointType}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${pointType}"
        ${pointType === currentType ? 'checked' : ''}
      >
      <label
        class="event__type-label  event__type-label--${pointType}"
        for="event-type-${pointType}">${capitalizeFirstLetter(pointType)}
      </label>
    </div>
  `)).join('');
}

//создаем шаблон для офферов

function createOffersTemplate(pointOffers, selectedOffers) {
  return pointOffers.map((offer) => (`
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.id}"
        type="checkbox"
        value="${offer.id}"
        name="event-offer-${offer.title}" ${selectedOffers.includes(offer.id) ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>
  `)).join('');
}

//создаем шаблон для списка направлений

function createDestinationsList(allDestinations) {

  return `${allDestinations.map((city) => `<option value="${city.name}"></option>`).join('')}`;
}

//создаем шаблон для направления

function createDestinationTemplate(pointDestination) {
  if (!pointDestination) {
    return '';
  }

  const photosTemplate = createPhotosTemplate(pointDestination.photos);
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
        ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
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

function createButtonTemplate(isCreating) {
  if (isCreating) {
    return `
      <button class="event__reset-btn" type="reset">Cancel</button>
    `;
  }

  return `
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

//создаем шаблон поинта

function createEditPointTemplate(point, allOffers, allDestinations, formType) {

  const {type, price, id, offers, dateFrom, dateTo} = point;

  const pointOffers = allOffers.find((offer) => offer.type === type).offers; //офферы по типу

  const pointDestination = allDestinations.find((destination) => destination.id === point.destination);

  const typesList = createPointsTypeList(POINTS_TYPES, type); //получаем список типов ивентов для поинта

  //направления

  const destinationsList = createDestinationsList(allDestinations); //выбор направления в меню
  const destinationTemplate = createDestinationTemplate(pointDestination); //создаем шаблон для блочка Destination

  //офферы

  const offersList = pointOffers.length ? createOffersTemplate(pointOffers, offers) : ''; //собираем актуальные офферы под поинт

  const isCreating = formType === FORM_TYPE.CREATING;

  //время

  const startDateFormat = humanizeDate(dateFrom, DateFormat.DATE_IN_FORM); //время старта ивента
  const endDateFormat = humanizeDate(dateTo, DateFormat.DATE_IN_FORM); //время финиша ивента

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
            <datalist id="destination-list-${id}"
          >
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
            value="${startDateFormat}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-${id}"
            type="text"
            name="event-end-time"
            value="${endDateFormat}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>

        ${createButtonTemplate(isCreating)}

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
  #allOffers = null;
  #allDestinations = null;
  #handleFormSubmit = null;
  #handleCloseEditFormButton = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #currentformType = FORM_TYPE.EDITING;

  constructor ({point = NEW_POINT_FORM, allOffers, allDestinations, onFormSubmit, onCloseEditFormButton, formType}) {
    super();
    this._setState(PointFormEditView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditFormButton = onCloseEditFormButton;
    this._restoreHandlers();
    this.#currentformType = formType;
  }

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#allDestinations, this.#currentformType);
  }

  _restoreHandlers() {
    if(this.#currentformType === FORM_TYPE.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditFormButtonHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    }

    if(this.#currentformType === FORM_TYPE.CREATING) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    }

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.#setDatepicker();
  }

  reset(point) {
    this._setState(PointFormEditView.parsePointToState(point));
  }

  #typeChangeHandler = (evt) => {
    const newType = evt.target.value;

    this.updateElement({
      type: newType,
      offers: [],
    });
  };

  #selectDestination(name) {
    return this.#allDestinations.find((destination) => destination.name === name);
  }

  #destinationChangeHandler = (evt) => {
    const newCity = this.#selectDestination(evt.target.value);

    this.updateElement({
      destination: newCity.id
    });
  };

  #offerChangeHandler = (evt) => {
    const newOffers = evt.target.checked
      ? this._state.offers.concat(evt.target.value)
      : this._state.offers.filter((offer) => offer !== evt.target.value);

    this._setState({...this._state.point, offers: newOffers});
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      price: evt.target.value
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointFormEditView.parseStateToPoint(this._state));
  };

  //для кнопки открытия/закрытия формы редактирования

  #closeEditFormButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditFormButton();
  };

  //работа с библиотекой flatpickr

  #setDatepicker = () => {
    const startDatePickr = this.element.querySelector('.event__input--time[name="event-start-time"]');
    const endDatePickr = this.element.querySelector('.event__input--time[name="event-end-time"]');

    const flatpickerConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true,
    };

    this.#datePickerFrom = flatpickr(startDatePickr, {
      ...flatpickerConfig,
      defaultDate: this._state.dateFrom,
      onClose: this.#closeFromDateHandler,
      maxDate: this._state.dateTo
    });

    this.#datePickerTo = flatpickr(endDatePickr, {
      ...flatpickerConfig,
      defaultDate: this._state.dateTo,
      onClose: this.#closeToDateHandler,
      minDate: this._state.dateFrom,
    });

  };

  #closeFromDateHandler = ([selectedDate]) => {
    this._setState({
      ...this._state,
      dateFrom: selectedDate
    });

    this.#datePickerTo.set('minDate'. selectedDate);
  };

  #closeToDateHandler = ([selectedDate]) => {
    this._setState({
      ...this._state,
      dateTo: selectedDate
    });

    this.#datePickerFrom.set('maxDate'. selectedDate);
  };

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  #formDeleteHandler = (evt) => {
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

import {createElement} from '../render.js';
import {POINTS_TYPES, DateFormat, NEW_POINT_FORM} from '../const.js';
import {humanizeDate, capitalizeFirstLetter} from '../utils.js';

function createPointsTypeList (types, type) {
  return types.map((element) => `
  <div class="event__type-item">
    <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}" ${element === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${capitalizeFirstLetter(element)}</label>
  </div>`).join('');
}

function createOffersTemplate (offers, type) {
  return offers.length > 0 ? `<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offers.map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${type}-${offer.id}" type="checkbox" name="event-offer-${offer.id}" checked>
        <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
    </div>
  </section>` : '';
}

function createDestinationTemplate ({name, description, photos}) {

  const photosTemplate = createPhotosTemplate(photos);

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${name}. ${description}</p>

  ${photosTemplate}

</section>`;
}

function createPhotosTemplate (photos) {
  return photos.length > 0 ? `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  </div>
</div>` : '';
}

function createNewPointTemplate (point, offers, destination) {

  const {type, dateFrom, dateTo, price} = point;
  const {name, description, photos} = destination;
  const destinationName = name;
  const typesList = createPointsTypeList(POINTS_TYPES, type);

  const startTimeInForm = humanizeDate(dateFrom, DateFormat.DATE_IN_FORM);
  const endTimeInForm = humanizeDate(dateTo, DateFormat.DATE_IN_FORM);

  const offersTemplate = createOffersTemplate(offers);
  const destinationsTemplate = createDestinationTemplate({name, description, photos});

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${typesList}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${point.id}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinationName}" list="destination-list-${point.id}">
      <datalist id="destination-list-${point.id}">
        <option value="${destinationName}"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${startTimeInForm}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${endTimeInForm}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${point.id}">
        <span class="visually-hidden">Price</span>
        &euro; ${price}
      </label>
      <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">

    ${offersTemplate}
    ${destinationsTemplate}

  </section>
</form>`;
}

export default class NewPointView {

  constructor ({point = NEW_POINT_FORM, offers, destination}) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createNewPointTemplate (this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

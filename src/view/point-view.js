import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, calcPointDuration} from '../utils/utils.js';
import {DateFormat} from '../const.js';

function createOffersListTemplate(pointOffers, selectedOffers) {
  return (
    `<ul class="event__selected-offers">
    ${pointOffers.map((offer) => selectedOffers.includes(offer.id) ? (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`)
      : '').join('')}
    </ul>`
  );
}

function createTripListTemplate({point, allOffers, pointDestination}) {
  const {basePrice, 'is_favorite' : isFavorite, type, offers, dateFrom, dateTo} = point;
  const pointOffers = allOffers.find((offer) => offer.type === type).offers;

  const startDateShort = humanizeDate(dateFrom, DateFormat.DATE);
  const startTime = humanizeDate(dateFrom, DateFormat.TIME);
  const endTime = humanizeDate(dateTo, DateFormat.TIME);

  return (`
    <li class="trip-events__item">
      <div class="event">
          <time class="event__date" datetime="${dateFrom}">${startDateShort}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${pointDestination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
              &mdash;
              <time class="event__end-time" "${dateTo}">${endTime}</time>
            </p>
            <p class="event__duration">${calcPointDuration(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${createOffersListTemplate(pointOffers, offers)}
          </ul>

          <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
      </div>
    </li>
  `);
}

export default class PointView extends AbstractView {
  #point = null;
  #allOffers = null;
  #pointDestination = null;
  #handleEventClick = null;
  #handleFavouriteClick = null;

  constructor({point, allOffers, pointDestination, onEditClick, onFavouriteClick}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#pointDestination = pointDestination;
    this.#handleEventClick = onEditClick;
    this.#handleFavouriteClick = onFavouriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favouriteClickHandler);

  }

  get template() {
    return createTripListTemplate({
      point: this.#point,
      allOffers: this.#allOffers,
      pointDestination: this.#pointDestination
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventClick();
  };

  #favouriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavouriteClick();
  };
}

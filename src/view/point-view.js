import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, calcPointDuration} from '../utils/utils.js';
import {DateFormat} from '../const.js';

function createOffersListTemplate(offers, pointOffers) {
  return (
    `<ul class="event__selected-offers">
      ${pointOffers.map((item) => offers.includes(item.id) ? (
      `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`)
      : '').join('')}
    </ul>`
  );
}

function createTripListTemplate ({point, pointOffers, pointDestination}) {
  const {
    price, dateFrom, dateTo, isFavourite, type, offers
  } = point;

  const startDateShort = humanizeDate(dateFrom, DateFormat.DATE);
  const startTime = humanizeDate(dateFrom, DateFormat.TIME);
  const endTime = humanizeDate(dateTo, DateFormat.TIME);

  return (`
    <li class="trip-events__item">
      <div class="event">
          <time class="event__date" datetime="${startDateShort}">${startDateShort}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${pointDestination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
            </p>
            <p class="event__duration">${calcPointDuration(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${createOffersListTemplate(offers, pointOffers)}
          </ul>

          <button class="event__favorite-btn ${isFavourite ? 'event__favorite-btn--active"' : ''} type="button">
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
  #pointOffers = null;
  #pointDestination = null;
  #handleEventClick = null;
  #handleFavouriteClick = null;

  constructor({point, pointOffers, pointDestination, onEditClick, onFavouriteClick}) {
    super();
    this.#point = point;
    this.#pointOffers = pointOffers;
    this.#pointDestination = pointDestination;
    this.#handleEventClick = onEditClick;
    this.#handleFavouriteClick = onFavouriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favouriteClickHandler);

  }

  get template() {
    return createTripListTemplate({
      point: this.#point,
      pointOffers: this.#pointOffers,
      pointDestination: this.#pointDestination
    });
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#handleEventClick();
  };

  #favouriteClickHandler = (event) => {
    event.preventDefault();
    this.#handleFavouriteClick();
  };
}

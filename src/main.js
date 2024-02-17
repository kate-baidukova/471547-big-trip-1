import HeaderInfoPresenter from '../presenter/header-info-presenter.js';
import TripEventsPresenter from '../presenter/trip-presenter.js';

const mainInfoElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainInfoElement});
const tripEventsPresenter = new TripEventsPresenter ({tripEventsContainer: eventsElement});

headerInfoPresenter.init();
tripEventsPresenter.init();

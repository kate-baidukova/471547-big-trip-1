import HeaderInfoPresenter from '../presenter/header-info-presenter.js';
import TripPresenter from '../presenter/trip-presenter.js';

const mainInfoElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');


const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainInfoElement});
const tripPresenter = new TripPresenter ({mainTripEventsContainer: eventsElement});

headerInfoPresenter.init();
tripPresenter.init();

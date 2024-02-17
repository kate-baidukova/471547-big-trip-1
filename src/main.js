import HeaderInfoPresenter from '../presenter/header-info-presenter.js';
import HeaderFilterPresenter from '../presenter/header-filter-presenter.js';
import TripPresenter from '../presenter/trip-presenter.js';

const mainElement = document.querySelector('.page-body');
const mainInfoElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');
const tripControlsElement = mainElement.querySelector('.trip-controls__filters');

const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainInfoElement});
const tripPresenter = new TripPresenter ({mainTripEventsContainer: eventsElement});
const headerFilterPresenter = new HeaderFilterPresenter ({headContainer: tripControlsElement});


headerInfoPresenter.init();
headerFilterPresenter.init();
tripPresenter.init();

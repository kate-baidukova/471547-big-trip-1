import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import {trip} from '../src/mock/trip.js';

const mainElement = document.querySelector('.page-body');
const mainContentElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector('.trip-events');
const tripControlsElement = mainElement.querySelector('.trip-controls__filters');

const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainContentElement});
const headerFilterPresenter = new HeaderFilterPresenter ({headContainer: tripControlsElement});
const tripPresenter = new TripPresenter ({mainContentContainer: eventsContainerElement});

headerInfoPresenter.init();
headerFilterPresenter.init();
tripPresenter.init();

trip();

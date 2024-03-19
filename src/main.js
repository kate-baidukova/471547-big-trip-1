import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import TripPresenter from './presenter/main-presenter.js';
import MockData from './mock/mock-service.js';
import OffersModel from './model/offers-model.js';
import TripModel from './model/trip-model.js';
import DestinationsModel from './model/destinations-model.js';

const mockData = new MockData();
const destinationsModel = new DestinationsModel(mockData);
const offersModel = new OffersModel(mockData);
const tripModel = new TripModel(mockData);

const mainElement = document.querySelector('.page-body');
const mainContentElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector('.trip-events');
const tripControlsElement = mainElement.querySelector('.trip-controls__filters');

//header
const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainContentElement});
const headerFilterPresenter = new HeaderFilterPresenter ({headContainer: tripControlsElement});

//main
const tripPresenter = new TripPresenter ({mainContentContainer: eventsContainerElement, destinationsModel, offersModel, tripModel});

headerInfoPresenter.init();
headerFilterPresenter.init();
tripPresenter.init();

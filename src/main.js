import HeaderInfoPresenter from './presenter/header-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

import MockData from './service/service.js';

import OffersModel from './model/offers-model.js';
import TripModel from './model/trip-model.js';
import DestinationModel from './model/destination-model.js';

const mockData = new MockData();

const destinationModel = new DestinationModel(mockData);
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
const mainPresenter = new MainPresenter ({
  mainContentContainer: eventsContainerElement,
  destinationModel,
  offersModel,
  tripModel,
});

headerInfoPresenter.init();
headerFilterPresenter.init();
mainPresenter.init();

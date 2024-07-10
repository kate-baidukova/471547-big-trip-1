import MockData from '../service/service.js';

import HeaderInfoPresenter from './header-info-presenter.js';
//import HeaderFilterPresenter from './header-filter-presenter.js';
import PointsPresenter from './points-presenter.js';

import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';
import TripModel from '../model/trip-model.js';
import FiltersModel from '../model/filter-model.js';

const mainContentElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector('.trip-events');
const siteFilterContainer = document.querySelector('.trip-controls__filters');

const mockData = new MockData();

const destinationsModel = new DestinationsModel(mockData);
const offersModel = new OffersModel(mockData);
const tripModel = new TripModel(mockData);
const filterModel = new FiltersModel();

//header
const headerInfoPresenter = new HeaderInfoPresenter({
  headContainer: mainContentElement,
  headerFiltersList: siteFilterContainer,
  tripModel
});
//const headerFilterPresenter = new HeaderFilterPresenter({tripModel});


//экземпляр класса для поинтов маршрута
const pointsPresenter = new PointsPresenter({
  eventsContainerElement: eventsContainerElement,
  headerContainerElement: mainContentElement,
  destinationsModel,
  tripModel,
  offersModel,
  filterModel,
});


export default class MainPresenter {
  init() {
    headerInfoPresenter.init();
    //headerFilterPresenter.init();
    pointsPresenter.init();
  }
}

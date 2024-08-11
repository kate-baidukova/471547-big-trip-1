import HeaderInfoPresenter from './header-info-presenter.js';
//import HeaderFilterPresenter from './header-filter-presenter.js';
import PointsPresenter from './points-presenter.js';

import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';
import TripModel from '../model/trip-model.js';
import FiltersModel from '../model/filter-model.js';

import PointApiService from '../service/api-service.js';
import {END_POINT, AUTHORIZATION} from '../const.js';

const mainContentElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector('.trip-events');
const siteFilterContainer = document.querySelector('.trip-controls__filters');

const pointsApiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const tripModel = new TripModel(
  pointsApiService,
  destinationsModel,
  offersModel,
);
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


export default class AppPresenter {
  init() {
    headerInfoPresenter.init();
    //headerFilterPresenter.init();
    pointsPresenter.init();
    tripModel.init();
  }
}

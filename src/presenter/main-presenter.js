import HeaderInfoPresenter from './header-info-presenter.js';
import HeaderFilterPresenter from './header-filter-presenter.js';
import PointsPresenter from '../presenter/points-presenter.js';
import MockData from '../service/service.js';
import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';
import TripModel from '../model/trip-model.js';

const mainContentElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector('.trip-events');

const mockData = new MockData();

const destinationsModel = new DestinationsModel(mockData);
const offersModel = new OffersModel(mockData);
const tripModel = new TripModel(mockData);

//header
const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainContentElement});
const headerFilterPresenter = new HeaderFilterPresenter ({tripModel});

//экземпляр класса для поинтов маршрута
const pointsPresenter = new PointsPresenter ({
  eventsContainerElement: eventsContainerElement,
  destinationsModel,
  tripModel,
  offersModel,
});

export default class MainPresenter {
  init() {
    headerInfoPresenter.init();
    headerFilterPresenter.init();
    pointsPresenter.init();
  }
}

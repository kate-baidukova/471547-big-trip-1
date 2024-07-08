import HeaderInfoPresenter from './header-info-presenter.js';
import HeaderFilterPresenter from './header-filter-presenter.js';
import PointsPresenter from './points-presenter.js';
import MockData from '../service/service.js';
import DestinationsModel from '../model/destinations-model.js';
import OffersModel from '../model/offers-model.js';
import TripModel from '../model/trip-model.js';
import FiltersModel from '../model/filter-model.js';
import NewPointButtonPresenter from './new-point-button-presenter.js';


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
const headerFilterPresenter = new HeaderFilterPresenter({tripModel});

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: mainContentElement,
});

//экземпляр класса для поинтов маршрута
const pointsPresenter = new PointsPresenter({
  eventsContainerElement: eventsContainerElement,
  destinationsModel,
  tripModel,
  offersModel,
  filterModel,
});


export default class MainPresenter {
  init() {
    newPointButtonPresenter.init({onButtonClick: pointsPresenter.newPointButtonClickHandler});
    headerInfoPresenter.init();
    headerFilterPresenter.init();
    pointsPresenter.init();
  }
}

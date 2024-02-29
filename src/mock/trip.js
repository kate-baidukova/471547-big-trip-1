import {getRandomArrayElement} from '../utils/util.js';
import {ROUTE_POINTS, DESTINATIONS, STATUS} from './const.js';

const mockRoutePoint = [
  {
    routeType: getRandomArrayElement(ROUTE_POINTS),
    destination: getRandomArrayElement(DESTINATIONS),
    data: '',
    time: '',
    price: '100',
    offers: {
      'Order Uber': 25,
      'Add luggage': 20,
      'Switch to comfort': 35,
      'Rent a car': 25,
      'Add breakfast': 40,
      'Book tickets': 20,
    },
    duration: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    favourite: true,
    status: getRandomArrayElement(STATUS),
  },
];

const getRandomTrip = () => getRandomArrayElement(mockRoutePoint);
// eslint-disable-next-line no-console
const trip = () => console.log(mockRoutePoint);

export {getRandomTrip, trip};

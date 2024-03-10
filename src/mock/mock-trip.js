//import {STATUS} from './const.js';
import {getRandomNumber, getRandomId} from '../utils/util.js';

const generatePointId = getRandomId (1, 20);

const createPoint = (type, destinationId, offersIds) => ({
  id: generatePointId (),
  type: type,
  destination: destinationId,
  dateFrom: new Date('2024-02-29, 21:00'),
  dateTo: new Date('2024-03-03, 21:00'),
  price: getRandomNumber(50, 200),
  offers: offersIds,
  isFavourite: Boolean(getRandomNumber (0, 1)),
});

export {createPoint};

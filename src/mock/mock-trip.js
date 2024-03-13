import {MIN_RANDOM_ID, MAX_RANDOM_ID, MIN_PRICE, MAX_PRICE} from './const.js';
import {getRandomNumber, getRandomId, getRandomBoolean} from '../utils/util.js';

const generatePointId = getRandomId (MIN_RANDOM_ID, MAX_RANDOM_ID);

const createPoint = (type, destinationId, offersIds) => ({
  id: generatePointId (),
  type: type,
  destination: destinationId,
  dateFrom: new Date('2024-02-29, 21:00'),
  dateTo: new Date('2024-03-03, 21:00'),
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  offers: offersIds,
  isFavourite: getRandomBoolean (),
});

export {createPoint};

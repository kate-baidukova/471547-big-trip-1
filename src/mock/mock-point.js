import {RandomPrice} from './mock-const.js';
import {getRandomNumber, getRandomBoolean} from './mock-utils.js';
import {getRandomDate} from './mock-utils.js';

const createPoint = (type, destinationId, offersIds) => ({
  id: crypto.randomUUID(),
  type,
  destination: destinationId,
  dateFrom: getRandomDate(new Date(), new Date(2025, 0, 1)),
  dateTo:  getRandomDate(new Date(2025, 0, 1), new Date(2029, 0, 1)),
  price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
  offers: offersIds,
  isFavourite: getRandomBoolean(),
});

export {createPoint};

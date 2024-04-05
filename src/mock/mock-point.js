import {RandomPrice} from './mock-const.js';
import {getRandomNumber, getRandomBoolean} from './mock-utils.js';

const createPoint = (type, destinationId, offersIds) => ({
  id: crypto.randomUUID(),
  type,
  destination: destinationId,
  dateFrom: new Date('2024-02-29, 21:00'),
  dateTo: new Date('2024-03-03, 21:00'),
  price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
  offers: offersIds,
  isFavourite: getRandomBoolean(),
});

export {createPoint};

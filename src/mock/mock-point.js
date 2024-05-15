import {RandomPrice} from './mock-const.js';
import {getRandomNumber, getRandomBoolean} from './mock-utils.js';
import {getRandomDate} from './mock-utils.js';

const createPoint = (type, destinationId, offersIds) => ({
  id: crypto.randomUUID(),
  type,
  destination: destinationId,
  dateFrom: getRandomDate(new Date('2023-05-28T11:35:55Z'), new Date('2023-05-30T11:35:55Z')),
  dateTo:  getRandomDate(new Date('2023-05-29T11:35:55Z'), new Date('2023-07-28T11:35:55Z')),
  price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
  offers: offersIds,
  isFavourite: getRandomBoolean(),
});

export {createPoint};

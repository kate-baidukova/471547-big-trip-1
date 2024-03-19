import {RandomId, RandomPrice} from './const.js';
import {getRandomNumber, getRandomId, getRandomBoolean} from './mock-utils.js';

const generatePointId = getRandomId(RandomId.MIN, RandomId.MAX);

const createPoint = (type, destinationId, offersIds) => ({
  id: generatePointId(),
  type,
  destination: destinationId,
  dateFrom: new Date('2024-02-29, 21:00'),
  dateTo: new Date('2024-03-03, 21:00'),
  price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
  offers: offersIds,
  isFavourite: getRandomBoolean(),
});

export {createPoint};

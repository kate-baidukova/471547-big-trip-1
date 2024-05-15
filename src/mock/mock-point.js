import {RandomPrice} from './mock-const.js';
import {getRandomNumber, getRandomBoolean} from './mock-utils.js';
import {getRandomDate, getRandomDateTo} from './mock-utils.js';

const createPoint = (type, destinationId, offersIds) => {
  const randomDateFrom = getRandomDate(new Date(), new Date(2025, 0, 1));

  return ({
    id: crypto.randomUUID(),
    type,
    destination: destinationId,
    dateFrom: randomDateFrom,
    dateTo: getRandomDateTo(randomDateFrom),
    price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
    offers: offersIds,
    isFavourite: getRandomBoolean(),
  });
};

export {createPoint};

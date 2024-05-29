import {RandomPrice} from './mock-const.js';
import {getRandomNumber, getRandomBoolean} from './mock-utils.js';
import {getRandomDate} from './mock-utils.js';
import dayjs from 'dayjs';


const createPoint = (type, destinationId, offersIds) => {

  const randomDateFrom = getRandomDate(new Date(), new Date(2027, 0, 1));
  const getRandomDateTo = (dateFrom) => dayjs(dateFrom)
    .add((Math.random() * 30), 'day')
    .add((Math.random() * 10), 'hour')
    .add((Math.random() * 10), 'minute')
    .toDate();

  const randomDateTo = getRandomDateTo(randomDateFrom);

  return {
    id: crypto.randomUUID(),
    type,
    destination: destinationId,
    dateFrom: randomDateFrom,
    dateTo: randomDateTo,
    price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
    offers: offersIds,
    isFavourite: getRandomBoolean(),
  };
};

export {createPoint};

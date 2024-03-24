import {OFFERS, RandomId, RandomPrice} from './mock-const.js';
import {getRandomId, getRandomNumber, getRandomArrayElement} from './mock-utils.js';

const generateOfferId = getRandomId(RandomId.MIN, RandomId.MAX);

function createOffer() {
  return {
    id: generateOfferId(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
  };
}

export {createOffer};

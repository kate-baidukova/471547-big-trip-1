import {OFFERS, RandomPrice} from './mock-const.js';
import {getRandomNumber, getRandomArrayElement} from './mock-utils.js';

function createOffer() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomNumber(RandomPrice.MIN, RandomPrice.MAX),
  };
}

export {createOffer};

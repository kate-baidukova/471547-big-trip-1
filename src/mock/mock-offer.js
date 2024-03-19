import {OFFERS, RandomId, RandomPrice} from './const.js';
import {getRandomId, getRandomNumber, getRandomArrayElement} from '../utils/util.js';

const generateOfferId = getRandomId (RandomId.MIN, RandomId.MAX);

function createOffer () {
  return {
    id: generateOfferId (),
    title: getRandomArrayElement (OFFERS),
    price: getRandomNumber (RandomPrice.MIN, RandomPrice.MAX),
  };
}

export {createOffer};

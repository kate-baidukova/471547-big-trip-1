import {OFFERS, MIN_RANDOM_ID, MAX_RANDOM_ID, MIN_PRICE, MAX_PRICE} from './const.js';
import {getRandomId, getRandomNumber, getRandomArrayElement} from '../utils/util.js';

const generateOfferId = getRandomId (MIN_RANDOM_ID, MAX_RANDOM_ID);

function createOffer () {
  return {
    id: generateOfferId (),
    title: getRandomArrayElement (OFFERS),
    price: getRandomNumber (MIN_PRICE, MAX_PRICE),
  };
}

export {createOffer};

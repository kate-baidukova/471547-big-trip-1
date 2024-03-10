import {OFFERS} from './const.js';
import {getRandomId, getRandomNumber, getRandomArrayElement} from '../utils/util.js';

const generateOfferId = getRandomId (1, 30);

function createOffer () {
  return {
    id: generateOfferId (),
    title: getRandomArrayElement(OFFERS),
    price: getRandomNumber(15, 150),
  };
}

export {createOffer};

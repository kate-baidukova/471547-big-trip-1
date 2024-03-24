import {DESTINATIONS, PHOTOS_COUNT, DESCRIPTIONS, RandomId, PHOTOS_RANDOM_COUNT} from './mock-const.js';
import {getRandomArrayElement, getRandomId, getRandomInteger, getRandomNumber} from './mock-utils.js';

const generateDestinationId = getRandomId(RandomId.MIN, RandomId.MAX);

function createDestination() {

  const makeDescription = () => Array.from(
    {length: getRandomNumber(1, DESCRIPTIONS.length)},
    () => getRandomArrayElement(DESCRIPTIONS),
  ).join(' ');

  const description = makeDescription();

  function makePhoto() {
    return {
      description,
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(PHOTOS_RANDOM_COUNT)}`
    };
  }

  const photos = Array.from({length: getRandomNumber(0, PHOTOS_COUNT)}, makePhoto);

  return {
    id: generateDestinationId(),
    name: getRandomArrayElement(DESTINATIONS),
    description,
    photos,
  };
}

export {createDestination};

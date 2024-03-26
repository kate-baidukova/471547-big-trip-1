import {PHOTOS_COUNT, DESCRIPTIONS, PHOTOS_RANDOM_COUNT} from './mock-const.js';
import {DESTINATIONS} from '../const.js';
import {getRandomArrayElement, getRandomInteger, getRandomNumber} from './mock-utils.js';

function createDestination() {

  const city = getRandomArrayElement(DESTINATIONS);

  const makeDescription = () => Array.from(
    {length: getRandomNumber(1, DESCRIPTIONS.length)},
    () => getRandomArrayElement(DESCRIPTIONS),
  ).join(' ');

  const description = makeDescription();

  function makePhoto() {
    return {
      description: `${city} photo`,
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(PHOTOS_RANDOM_COUNT)}`
    };
  }

  const photos = Array.from({length: getRandomNumber(1, PHOTOS_COUNT)}, makePhoto);

  return {
    id: crypto.randomUUID(),
    name: city,
    description,
    photos,
  };
}

export {createDestination};

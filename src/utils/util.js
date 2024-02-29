import dayjs from 'dayjs';

const getRandomNumber = (number) => Math.floor(Math.random() * number);

const getRandomArrayElement = (items) => items[getRandomNumber(items.length)];

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

export {getRandomNumber, getRandomArrayElement, capitalizeFirstLetter, humanizeDate};

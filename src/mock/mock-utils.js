import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

//задаем старт ивенту рандомно

const getRandomDateTo = (dateFrom) => dayjs(dateFrom).add((Math.random() * 30), 'day').add((Math.random() * 10), 'hour').add((Math.random() * 10), 'minute');

//получаем случайную дату

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

//получаем случайное число из заданного диапазона

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//получаем случайное число

const getRandomInteger = (max) => Math.floor(Math.random() * max);

//получаем случайный элемент

const getRandomArrayElement = (items) => items[getRandomNumber(0, items.length - 1)];

//получаем случайное булево значение

function getRandomBoolean() {
  const randomNumber = Math.random();
  return randomNumber >= 0.5;
}

export {
  getRandomDateTo,
  getRandomNumber,
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
  getRandomDate,
};

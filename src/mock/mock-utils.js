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

//создаем счетчик для генерации случайного ID

/*const getRandomId = (min, max) => {
  const previousValues = [];

  const getValue = () => {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };

  return getValue;
};*/

export {
  getRandomNumber,
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
};

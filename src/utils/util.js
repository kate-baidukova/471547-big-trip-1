const getRandomNumber = (number) => Math.floor(Math.random() * number);

const getRandomArrayElement = (items) => items[getRandomNumber(items.length)];

export {getRandomNumber, getRandomArrayElement};

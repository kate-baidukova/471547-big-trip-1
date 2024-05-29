import {SortTypes, DateFormat, MSEC_IN_DAY, MSEC_IN_HOUR} from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

//задаем формат даты

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';
//вычисляем продолжительность события

const calcPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true){
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format(DateFormat.DAYS_HOURS_MINUTES);
      break;
    case (timeDiff > MSEC_IN_HOUR || timeDiff < MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format(DateFormat.HOURS_MINUTES);
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format(DateFormat.MINUTES);
      break;
  }

  return pointDuration;
};

//определяем актуальность события

const isPastDate = (date) => dayjs(date).isBefore(dayjs());

const isPresentDate = (dateFrom, dateTo) => dayjs().isBetween(dateFrom, dateTo, 'day');

const isFutureDate = (date) => dayjs(date).isAfter(dayjs());

//делаем первую букву заглавной

const capitalizeFirstLetter = (string) => !string ? string : string.charAt(0).toUpperCase() + string.slice(1);

//выбор обновленного события

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

//сортируем поинты по цене

const sortPointsByPrice = (currentPoint, nextPoint) => nextPoint.price - currentPoint.price;

//сортируем поинты по дате

const sortPointsByDate = (currentPoint, nextPoint) => dayjs(nextPoint.dateFrom).diff(dayjs(currentPoint.dateFrom));

//сортируем поинты по времени

const sortPointsByTime = (currentPoint, nextPoint) => {
  const currentPointDuration = dayjs(currentPoint.dateTo).diff(dayjs(currentPoint.dateFrom));
  const nextPointDuration = dayjs(nextPoint.dateTo).diff(dayjs(nextPoint.dateFrom));

  return nextPointDuration - currentPointDuration;
};

const sorting = {
  [SortTypes.DAY]: (points) => [...points].sort(sortPointsByDate),
  [SortTypes.EVENT]: () => {
    throw new Error(`Sort by ${SortTypes.EVENT} is disabled`);
  },
  [SortTypes.TIME]: (points) => [...points].sort(sortPointsByTime),
  [SortTypes.PRICE]: (points) => [...points].sort(sortPointsByPrice),
  [SortTypes.OFFER]: () => {
    throw new Error(`Sort by ${SortTypes.OFFER} is disabled`);
  }
};

export {
  humanizeDate,
  calcPointDuration,
  isPastDate,
  isPresentDate,
  isFutureDate,
  capitalizeFirstLetter,
  updateItem,
  sorting,
};

import {DateFormat, MSEC_IN_DAY, MSEC_IN_HOUR} from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import {SortTypes} from '../const.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

//задаем формат даты

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const formatFullDate = (inputDate) => //задаем дату в полном формате
  inputDate ? dayjs(inputDate).format(DateFormat.FULL) : '';

const formatShortDate = (inputDate) => //задаем месяцы
  inputDate ? dayjs(inputDate).format(DateFormat.DATE) : '';

const formatTime = (inputDate) => // задаем часы/минуты
  inputDate ? dayjs(inputDate).format(DateFormat.TIME) : '';

//вычисляем продолжительность события

const calcPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  if (timeDiff >= MSEC_IN_DAY) {
    pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= MSEC_IN_HOUR) {
    pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
  } else if (timeDiff < MSEC_IN_HOUR) {
    pointDuration = dayjs.duration(timeDiff).format('mm[M]');
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

// определяем разницу между датами/временем пребывания в поинте для сортировки
const getDataDifference = (startDate, endDate) => dayjs(endDate).diff(dayjs(startDate));

const getDataDifferenceInDays = (startDate, endDate) => {
  const date1 = dayjs(startDate);
  const date2 = dayjs(endDate);
  return date2.diff(date1, 'day');
};

//сортируем поинты по цене

const sortPointsByPrice = (currentPoint, nextPoint) => nextPoint.price - currentPoint.price;

//сортируем поинты по дате

const sortPointsByDate = (currentPoint, nextPoint) => getDataDifferenceInDays(nextPoint.dateFrom, currentPoint.dateFrom);

//сортируем поинты по времени

const sortPointsByTime = (currentPoint, nextPoint) => getDataDifference(nextPoint.dateTo, nextPoint.dateFrom) - getDataDifference(currentPoint.dateTo, currentPoint.dateFrom);

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
  formatFullDate,
  formatShortDate,
  formatTime,
  calcPointDuration,
  isPastDate,
  isPresentDate,
  isFutureDate,
  capitalizeFirstLetter,
  updateItem,
  sorting,
};

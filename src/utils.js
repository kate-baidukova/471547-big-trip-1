import {DateFormat, MSEC_IN_DAY, MSEC_IN_HOUR} from './const.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

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

//делаем первую букву заглавной

const capitalizeFirstLetter = (string) => !string ? string : string.charAt(0).toUpperCase() + string.slice(1);

export {
  humanizeDate,
  formatFullDate,
  formatShortDate,
  formatTime,
  calcPointDuration,
  capitalizeFirstLetter,
};

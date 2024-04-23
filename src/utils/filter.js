import {FiltersTypes} from '../const.js';
import {isFutureDate, isPresentDate, isPastDate} from './utils.js';

const filter = {
  [FiltersTypes.EVERYTHING]: (points) => points,
  [FiltersTypes.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateTo)),
  [FiltersTypes.PRESENT]: (points) => points.filter((point) => isPresentDate(point.dateFrom, point.dateTo)),
  [FiltersTypes.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};

export {filter};

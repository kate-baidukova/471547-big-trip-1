import {FiltersTypes} from '../const.js';

const filter = {
  [FiltersTypes.EVERYTHING]: (points) => points,
  [FiltersTypes.FUTURE]: (points) => points.filter((point) => point.dateFrom > new Date()),
  [FiltersTypes.PRESENT]: (points) => points.filter((point) => point.dateFrom <= new Date() && point.dateTo >= new Date()),
  [FiltersTypes.PAST]: (points) => points.filter((point) => point.dateTo < new Date())
};

export {filter};

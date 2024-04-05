const DESTINATIONS_COUNT = 15;

const DESTINATIONS = [
  'Krasnodar',
  'St. Petersburg',
  'Mariupol',
  'Pyatigorsk',
  'Sochi',
  'Vyborg',
  'Kaliningrad',
  'Samara',
  'Kazan',
  'Melburn',
  'Oslo',
  'Hallstatt',
  'Cassis',
  'Danang',
  'Tokyo',
  'Chengdu',
  'Samui',
  'Mahe',
];

const POINTS_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const NEW_POINT_FORM = {
  id: 1,
  type: 'Bus',
  offers: [],
  destination: '',
  dateFrom: '',
  dateTo: '',
  price: 0
};

const DateFormat = {
  DATE_IN_FORM: 'DD/MM/YY HH:mm',
  FULL: 'YYYY-MM-DD',
  DATE: 'MMM DD',
  TIME: 'HH:mm',
};

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;


export {DESTINATIONS_COUNT, DESTINATIONS, POINTS_TYPES, NEW_POINT_FORM, DateFormat, MSEC_IN_HOUR, MSEC_IN_DAY};

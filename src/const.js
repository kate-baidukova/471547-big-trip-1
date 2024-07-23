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

const FiltersTypes = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

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
  MINUTES: 'mm[M]',
  HOURS_MINUTES: 'HH[H] mm[M]',
  DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

const Timing = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
};

const MSEC_IN_HOUR = Timing.MIN_IN_HOUR * Timing.SEC_IN_MIN * Timing.MSEC_IN_SEC;
const MSEC_IN_DAY = Timing.HOUR_IN_DAY * MSEC_IN_HOUR;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FORM_TYPE = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const EnabledSortTypes = {
  [SortTypes.DAY]: true,
  [SortTypes.EVENT]: false,
  [SortTypes.TIME]: true,
  [SortTypes.PRICE]: true,
  [SortTypes.OFFER]: false,
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT:'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EMPTY_LIST_MESSAGE = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

export {
  DESTINATIONS_COUNT,
  DESTINATIONS,
  POINTS_TYPES,
  FiltersTypes,
  NEW_POINT_FORM,
  DateFormat,
  MSEC_IN_HOUR,
  MSEC_IN_DAY,
  Mode,
  FORM_TYPE,
  SortTypes,
  EnabledSortTypes,
  UserAction,
  UpdateType,
  EMPTY_LIST_MESSAGE
};

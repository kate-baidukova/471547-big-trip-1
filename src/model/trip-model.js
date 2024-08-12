import Observable from '../framework/observable.js';
import {updateItem, adaptToClient, adaptToServer} from '../utils/utils.js';
import {UpdateType} from '../const.js';

export default class TripModel extends Observable {
  #service = null;
  #points = [];
  #destinationsModel = null;
  #offersModel = null;

  constructor(service, destinationsModel, offersModel) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {
      const [points] = await Promise.all([
        this.#service.points,
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {isError: false});

    } catch (error) {
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: true});
    }
  }

  get points() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  async update(updateType, point) {
    try {
      const updatedPoint = await this.#service.updatePoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch(error) {
      throw new Error('Update point failure');
    }
  }

  async add(updateType, point) {
    try {
      const addedPoint = await this.#service.addPoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(addedPoint);
      this.#points = [...this.#points, adaptedPoint];
      this._notify(updateType, adaptedPoint);
    } catch(error) {
      throw new Error('Add point failure');
    }
  }

  async delete(updateType, point) {
    try {
      await this.#service.deletePoint(point);
      this.#points = this.#points.filter((item) => item.id !== point.id);
      this._notify(updateType);
    } catch(error) {
      throw new Error('Delete point failure');
    }
  }
}

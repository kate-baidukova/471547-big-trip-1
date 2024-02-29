import {render, RenderPosition} from '../render.js';

import FiltersList from '../view/filters-list-view.js';

export default class HeaderFilterPresenter {
  constructor ({headContainer}) {
    this.headContainer = headContainer;
  }

  init () {
    render (new FiltersList, this.headContainer, RenderPosition.BEFOREEND);
  }
}

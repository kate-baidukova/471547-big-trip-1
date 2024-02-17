import {render, RenderPosition} from '../src/render.js';

import FiltersList from '../view/list-filtered-view.js';

export default class HeaderFilterPresenter {
  constructor ({headContainer}) {
    this.headContainer = headContainer;
  }

  init () {
    render (new FiltersList, this.headContainer, RenderPosition.BEFOREEND);
  }
}

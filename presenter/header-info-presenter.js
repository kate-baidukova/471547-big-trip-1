import HeaderInfoView from '../view/header-info.js';
import {render, RenderPosition} from '../src/render.js';

export default class HeaderInfoPresenter {
  constructor ({headContainer}) {
    this.headContainer = headContainer;
  }

  init () {
    render (new HeaderInfoView, this.headContainer, RenderPosition.AFTERBEGIN);
  }
}

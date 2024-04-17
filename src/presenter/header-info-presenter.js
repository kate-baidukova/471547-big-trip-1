import {render, RenderPosition} from '../framework/render.js';
import HeaderInfoView from '../view/header-info.js';

export default class HeaderInfoPresenter {
  constructor({headContainer}) {
    this.headContainer = headContainer;
  }

  init() {
    render(new HeaderInfoView, this.headContainer, RenderPosition.AFTERBEGIN);
  }
}

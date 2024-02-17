import HeaderInfoPresenter from '../presenter/header-info-presenter.js';

//const mainElement = document.querySelector('page-body');
const mainInfoElement = document.querySelector('.trip-main');

const headerInfoPresenter = new HeaderInfoPresenter ({headContainer: mainInfoElement});

headerInfoPresenter.init();

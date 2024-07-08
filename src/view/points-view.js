import AbstractView from '../framework/view/abstract-view.js';

function createTripPointsTemplate() {
  return `<main class="page-body__page-main  page-main">
      <div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
        </section>
      </div>
    </main>`;
}

export default class PointsView extends AbstractView {
  get template() {
    return createTripPointsTemplate();
  }
}

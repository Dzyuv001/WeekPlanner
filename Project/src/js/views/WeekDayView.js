import * as base from "./base";

export default class WeekDayView {
  constructor() {}

  static _BuildMarkup(DayName) {
    let htmlMarkup = `
    <div class="wkPlan-col">
    <h2 class="wkPlan-col__title wkPlan-title__h2">${DayName}</h2>
    <div class="wkPlan-col__event-container">
    
    </div>
    </div>
    `;
    return htmlMarkup;
  }

  static RenderView(element, DayName) {
    let rootElement = document.querySelector(`.${element} .wkPlan__body`);
    if (typeof rootElement != "undefined" && rootElement != null) {
      rootElement.insertAdjacentHTML("beforeend", this._BuildMarkup(DayName));
    }
  }
}

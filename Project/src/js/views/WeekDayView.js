import * as base from "./base";

export default class WeekDayView {
  constructor() {}

  static _BuildMarkup(DayName) {
    let htmlMarkup = `
    <div class="wkPlan-col__day">
      <h2 class="wkPlan-col__title wkPlan-col__title--fixed wkPlan-title__h2 ">${DayName}</h2>
    </div>
    `;
    return htmlMarkup;
  }

  static RenderView(element, DayName) {
    let rootElement = document.querySelector(`.${element} .wkPlan-col`);
    if (typeof rootElement != "undefined" && rootElement != null) {
      rootElement.insertAdjacentHTML("beforeend", this._BuildMarkup(DayName));
    }
  }
}

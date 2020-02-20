import * as base from "./base";

export default class WeekDayView {
  constructor() {}

  static _BuildMarkup(dayData, dayIndex) {
    let htmlMarkup = `
    <div class="wkPlan-col__day" data-value="${dayIndex}_${dayData.index}">
      <h2 class="wkPlan-col__title wkPlan-col__title--fixed wkPlan-title__h2 ">${dayData.name}</h2>
    </div>
    `;
    return htmlMarkup;
  }

  static RenderView(element, dayData, dayIndex) {
    let rootElement = document.querySelector(`.${element} .wkPlan-col`);
    if (typeof rootElement != "undefined" && rootElement != null) {
      rootElement.insertAdjacentHTML("beforeend", this._BuildMarkup(dayData,dayIndex));
    }
  }
}

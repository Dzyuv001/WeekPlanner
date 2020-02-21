import * as base from "./base";

export default class WeekDayView {
  constructor() {}

  static _BuildMarkup(dayData, dayIndex) {
    //day index is the index of the column 
    //dayData is the index of the day based on the english 
    //date system ie monday is first day of the week and represented by 0
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
    return rootElement.getElementsByClassName("wkPlan-col__day")[dayIndex];
    }
  }
}

import * as base from "./base";

export default class WeekPlannerView {
  constructor() {}

  _RenderMarkup(is24Hours) {
    let htmlMarkup = `
    <h1 class="wkPlan-title__h1">WeekP</h1>
    <section class="wkPlan__body">
      <div class="wkPlan__times wkPlan-times">
        ${this._RenderTimes(is24Hours)}
      </div>
    </section>
    `;
    return htmlMarkup;
  }

  _RenderTimes(is24Hours) {
    let htmlMarkup = "";
    if (is24Hours) {
      for (let i = 0; i < 24; i++) {
        htmlMarkup += `<div class="wkPlan-times__time-label"> ${i}</div>`;
      }
    } else {
      const time = ["AM", "PM"];
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 12; i++) {
          htmlMarkup += `<div class="wkPlan-times__time-label">${i + 1}  ${
            time[j]
          }</div>`;
        }
      }
    }
    return htmlMarkup;
  }

  RenderView(element, is24Hours) {
    //timeFormat
    let rootElement = document.getElementsByClassName(element)[0];
    if (typeof rootElement != "undefined" && rootElement != null) {
      rootElement.innerHTML = this._RenderMarkup(is24Hours);
    }
  }
}

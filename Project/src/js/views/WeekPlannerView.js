import * as base from "./base";

export default class WeekPlannerView {
  constructor() {}

  _RenderMarkup(is24Hours) {
    let htmlMarkup = `
    <div class="wkPlan">
      <h1 class="wkPlan-title__h1">WeekP</h1>
      <section class="wkPlan__body d-flex flex-row">
        <div class="wkPlan__time wkPlan-col--time">
          ${this._RenderTimes(is24Hours)}
        </div>
      </section>
      <section class="wkPlan-line">
      <div class="wkPlan-line__ver">
      ${this._RenderVerticalLine()}
      </div>
      <div class="wkPlan-line__hor">
      ${this._RenderHorizontalLine()}
      </div>

      </section>
    </div>
    `;
    return htmlMarkup;
  }

   _RenderHorizontalLine() {
    let htmlMarkup = "";
    for (let i = 0; i < 24; i++) {
      htmlMarkup +=`<hr class="wkPlan-line__hor-line">`
    }
    return htmlMarkup;
  }

  _RenderVerticalLine() {
    let htmlMarkup = "";
    for (let i = 0; i < 6; i++) {
      htmlMarkup +=`<div class="wkPlan-line__ver-line"></div>`
    }
    return htmlMarkup;
  }

  _RenderTimes(is24Hours) {
    let htmlMarkup = "";
    if (is24Hours) {
      for (let i = 0; i < 24; i++) {
        htmlMarkup += `<div class="wkPlan-time__label"> ${i}</div>`;
      }
    } else {
      const time = ["AM", "PM"];
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 12; i++) {
          htmlMarkup += `<div class="wkPlan-time__label">${i + 1}  ${
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

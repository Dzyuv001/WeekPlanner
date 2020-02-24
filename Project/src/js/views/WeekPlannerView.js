import * as base from "./base";
import Util from "../views/util";
export default class WeekPlannerView {
  constructor(element) {
    this.rootElement = this._SetupRootElement(element);
  }

  _RenderMarkup(is24Hours) {
    let htmlMarkup = `
    <div class="wkPlan">
      <h1 class="wkPlan-title__h1">WeekP</h1>
      <section class="wkPlan-col d-flex flex-row">
        <div class="wkPlan__time wkPlan-col__time">
          ${this._RenderTimes(is24Hours)}
        </div>
      </section>
      <section class="wkPlan-line">
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
      htmlMarkup += `<hr class="wkPlan-line__hor-line">`;
    }
    return htmlMarkup;
  }

  RemoveElement() {
    Util.RemoveElement(this.rootElement);
  }

  GetRootElement() {
    return this.rootElement;
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

  _SetupRootElement(element) {
    let rootElement = document.getElementsByClassName(element)[0];
    if (!(typeof rootElement != "undefined" && rootElement != null)) {
      throw `Root Element ${element} is not found can not generate WeekPlanner`;
    }
    return rootElement;
  }

  RenderView(is24Hours) {
    //timeFormat
    this.rootElement.innerHTML = this._RenderMarkup(is24Hours);
  }
}

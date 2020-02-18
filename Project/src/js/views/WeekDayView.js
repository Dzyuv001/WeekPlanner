import * as base from "./base";

export default class WeekDayView {
  constructor() {}

  static _BuildMarkup() {
    let htmlMarkup = `
    <p class="wkPlan-title">Week Planner</p>
    <section class="wkPlan-body"></section>
    `;

    return htmlMarkup;
  }

  static RenderView(element) {
    let rootElement = document.getElementsByClassName(element)[0];
    this.testfunc();
    if (typeof rootElement != "undefined" && rootElement != null) {
      rootElement.innerHTML = this._BuildMarkup();
    }
  }
}

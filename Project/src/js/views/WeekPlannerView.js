import * as base from "./base";

export default class WeekPlannerView {
  constructor() {}

  _BuildMarkup() {
    let htmlMarkup = ``;

    return htmlMarkup;
  }

  testfunc() {
    console.log("this is a test func");
  }

  RenderView(element) {
    let rootElement = document.getElementsByClassName(element)[0];
    this.testfunc();
    console.log("adding the ui", rootElement);
    if (typeof rootElement != "undefined" && rootElement != null) {
      console.log("adding the ui");

      rootElement.innerHTML = this._BuildMarkup();
      // rootElement.innerHTML = "<p>this is a test to see if this is working and if not why not </p>"
    }
  }
}

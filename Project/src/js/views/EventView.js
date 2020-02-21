export default class EventView {
  constructor() {}

  static _CreateEventMarkup(percentage) {
    
    let htmlMarkup = `
<div class="wkPlan-event wkPlan-event__color-blue" style="top:${percentage}%;">
</div>`;
    return htmlMarkup;
  }

  static RenderEvent(element, percentage) {
    if (typeof element != "undefined" && element != null) {
      element.insertAdjacentHTML(
        "beforeend",
        this._CreateEventMarkup(percentage)
      );
    }
  }
}

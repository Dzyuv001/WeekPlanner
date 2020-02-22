export default class EventView {
  constructor() {}

  static _CreateEventMarkup(percentage, colIndex,eventId) {
    
    let htmlMarkup = `
<div class="wkPlan-event wkPlan-event__color-blue" data-value="${colIndex}_${eventId}" style="top:${percentage}%;">
</div>`;
    return htmlMarkup;
  }

  static RenderEvent(element,colIndex,eventId, percentage) {
    if (typeof element != "undefined" && element != null) {
      element.insertAdjacentHTML(
        "beforeend",
        this._CreateEventMarkup(percentage,colIndex,eventId)
      );
    }
  }
}

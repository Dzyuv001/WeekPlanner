import Util from "./util";
import colorArray from "../JSON/ColorNames.json";
export default class EventView {
  constructor(parentElement, percentage, colIndex, eventId) {
    this.eventElement = this.RenderEvent(
      parentElement,
      percentage,
      colIndex,
      eventId
    );
  }

  _CreateEventMarkup(percentage, colIndex, eventId) {
    let htmlMarkup = `
<div class="wkPlan-event wkPlan-background-css--dodgerblue" data-value="${colIndex}_${eventId}" style="top:${percentage}%;">
</div>`;
    return htmlMarkup;
  }

  RemoveEvent() {
    Util.RemoveElement(this.eventElement);
  }

  UpdateEventUi(eventData) {
    this.eventElement.setAttribute(
      "class",
      `wkPlan-event wkPlan-background-css--${colorArray[eventData.colorIndex]}`
    );
  }

  RenderEvent(parentElement, percentage, colIndex, eventId) {
    if (typeof parentElement != "undefined" && parentElement != null) {
      parentElement.insertAdjacentHTML(
        "beforeend",
        this._CreateEventMarkup(percentage, colIndex, eventId)
      );
      return parentElement.querySelector(
        `[data-value="${colIndex}_${eventId}"]`
      );
    } else {
      throw "Event could not be created";
    }
  }
}

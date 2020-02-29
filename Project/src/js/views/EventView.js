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
    this._BounceEvent();
  }

  _CreateEventMarkup(percentage, colIndex, eventId) {
    let htmlMarkup = `
<div class="wkPlan-event wkPlan-background-css--dodgerblue" data-value="${colIndex}_${eventId}" style="top:${percentage}%;">
  <p class="wkPlan-event__name">Event Name</p>
  <p class="wkPlan-event__times">
  <span class="wkPlan-event__start-time">00:00</span>
   - 
  <span class="wkPlan-event__end-time">00:00</span>
  </p>
</div>`;
    return htmlMarkup;
  }

  RemoveEvent() {
    Util.RemoveElement(this.eventElement);
  }

  UpdateEventUi(eventData) {
    const startPercent =eventData.startTime !== undefined ? this._ConvertTimeToPercentage(eventData.startTime): undefined;
    const endPercent = eventData.endTime !== undefined ? this._ConvertTimeToPercentage(eventData.endTime): undefined;
    this.eventElement.setAttribute(
      "class",
      `wkPlan-event wkPlan-background-css--${colorArray[eventData.colorIndex]}`
    );
    if (startPercent) this.eventElement.style.top = startPercent;
    if (endPercent) this.eventElement.style.height = endPercent;
    this._BounceEvent();
  }

  _ConvertTimeToPercentage(time) {
    const [hour, min] = time.split(":");
    const hourPercent = Math.floor(hour * (100 / 24) * 100) / 100;
    const minPercent = Math.floor((min / 60) * (100 / 24) * 100) / 100;
    return hourPercent + minPercent;
  }


  _BounceEvent(){
    const bounceClassName = "wkPlan-event--animated";
    this.eventElement.classList.remove(bounceClassName);
    void this.eventElement.offsetWidth
    this.eventElement.classList.add(bounceClassName);
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

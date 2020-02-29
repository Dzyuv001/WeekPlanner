import Util from "./util";
import colorArray from "../JSON/ColorNames.json";
export default class EventView {
  constructor(
    parentElement,
    percentage,
    colIndex,
    eventId,
    startTime,
    endTime
  ) {
    this.eventElement = this.RenderEvent(
      parentElement,
      percentage,
      colIndex,
      eventId,
      startTime,
      endTime
    );
    this._BounceEvent();
  }

  _CreateEventMarkup(percentage, colIndex, eventId,startTime,endTime) {
    let htmlMarkup = `
<div class="wkPlan-event wkPlan-background-css--dodgerblue" data-value="${colIndex}_${eventId}" style="top:${percentage}%;">
  <p class="wkPlan-event__name">Event Name</p>
  <p class="wkPlan-event__times">
  <span class="wkPlan-event__start-time">${startTime}</span>
   - 
  <span class="wkPlan-event__end-time">${endTime}</span>
  </p>
</div>`;
    return htmlMarkup;
  }

  RemoveEvent() {
    Util.RemoveElement(this.eventElement);
  }

  UpdateEventUi(eventData) {
    const startPercent =
      eventData.startTime !== undefined
        ? this._ConvertTimeToPercentage(eventData.startTime)
        : undefined;
    const endPercent =
      eventData.endTime !== undefined
        ? this._ConvertTimeToPercentage(eventData.endTime)
        : undefined;
    this.eventElement.setAttribute(
      "class",
      `wkPlan-event wkPlan-background-css--${colorArray[eventData.colorIndex]}`
    );
    if (startPercent) this.eventElement.style.top = startPercent;
    if (endPercent) this.eventElement.style.height = endPercent;
    if (eventData.startTime) {
      this.eventElement.querySelector(".wkPlan-event__start-time").value =
        eventData.startTime;
    }
    if (eventData.startTime) {
      this.eventElement.querySelector(".wkPlan-event__end-time").value =
        eventData.endTime;
    }
    this._BounceEvent();
  }

  _ConvertTimeToPercentage(time) {
    const [hour, min] = time.split(":");
    const hourPercent = Math.floor(hour * (100 / 24) * 100) / 100;
    const minPercent = Math.floor((min / 60) * (100 / 24) * 100) / 100;
    return hourPercent + minPercent;
  }

  _BounceEvent() {
    const bounceClassName = "wkPlan-event--animated";
    this.eventElement.classList.remove(bounceClassName);
    void this.eventElement.offsetWidth; //reflow css
    this.eventElement.classList.add(bounceClassName);
  }

  RenderEvent(
    parentElement,
    percentage,
    colIndex,
    eventId,
    startTime,
    endTime
  ) {
    if (typeof parentElement != "undefined" && parentElement != null) {
      parentElement.insertAdjacentHTML(
        "beforeend",
        this._CreateEventMarkup(percentage, colIndex, eventId,startTime,endTime)
      );
      return parentElement.querySelector(
        `[data-value="${colIndex}_${eventId}"]`
      );
    } else {
      throw "Event could not be created";
    }
  }
}

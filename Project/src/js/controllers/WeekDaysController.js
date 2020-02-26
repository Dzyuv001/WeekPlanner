import Event from "./EventController";
import WeekDayView from "../views/WeekDayView";
import WeekDayModel from "../models/WeekDayModel";

export default class WeekDay {
  constructor(element, WeekDayName, index, colIndex) {
    this.lastEventId = -1;
    this.Events = {};
    this.colIndex = colIndex;
    this.element = WeekDayView.RenderView(element, WeekDayName, index);
  }

  AddEventToDay(yPositionPercent, colIndex) {
    this.lastEventId += 1;
    this.Events[this.lastEventId] = new Event(
      yPositionPercent,
      this.element,
      colIndex,
      this.lastEventId
    );
  }

  GetCurrentEventIndex() {
    return this.lastEventId;
  }

  RemoveEventFromDay(colIndex, eventId) {
    this.Events[eventId].RemoveEvent(this.element, colIndex, eventId);
    delete this.Events[eventId];
  }
}

import Event from "./EventController";
import WeekDayView from "../views/WeekDayView";
import WeekDayModel from "../models/WeekDayModel";

export default class WeekDay {
  constructor(element, WeekDayName, index, colIndex) {
    this.lastEventId = -1;
    this.events = {};
    this.colIndex = colIndex;
    this.element = WeekDayView.RenderView(element, WeekDayName, index);
  }

  AddEventToDay(yPositionPercent, colIndex) {
    this.lastEventId += 1;
    this.events[this.lastEventId] = new Event(
      yPositionPercent,
      this.element,
      colIndex,
      this.lastEventId
    );
  }

  GetCurrentEventIndex() {
    return this.lastEventId;
  }

  GetSelectedEventData(eventIndex) {
    return this.events[eventIndex].GetEventModelData();
  }

  SetSelectedEvenData(eventIndex, eventData) {
    this.events[eventIndex].SetEventData(eventData);
  }

  GetLastEvent() {
    return this.events[this.lastEventId];
  }

  RemoveEventFromDay(colIndex, eventId) {
    this.events[eventId].RemoveEvent(this.element, colIndex, eventId);
    delete this.events[eventId];
  }
}

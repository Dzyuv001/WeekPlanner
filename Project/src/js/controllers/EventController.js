import EventView from "../views/EventView";
import EventModel from "../models/EventModel";
export default class Event {
  constructor(
    timePosition,
    element,
    colIndex,
    eventId,
    eventName,
    colorIndex = 6
  ) {
    this.eventContinues = "";
    this.eventModel = new EventModel(eventName, timePosition, colorIndex);
    this.CreateEventUI(element, colIndex, eventId, timePosition);
  }

  CreateEventUI(element, colIndex, eventId, timePosition) {
    //change time position value to a percentage so
    //that the view can correctly position the element
    const percentage = (timePosition / 96) * 100;
    EventView.RenderEvent(element, colIndex, eventId, percentage);
  }

  UpdateEventModelData() {
    this.eventModel.UpdateModelData();
  }

  GetEventModelData() {
    return this.eventModel.GetModelData();
  }

  SetEventModelData() {
    this.eventModel;
  }

  RemoveEvent(element, colIndex, eventId) {
    EventView.RemoveEvent(element, colIndex, eventId);
  }
}

import EventView from "../views/EventView";
import EventModel from "../models/EventModel";
export default class Event {
  constructor(
    positionPercentage,
    parentElement,
    colIndex,
    eventId,
    eventName,
    colorIndex = 6,
    
  ) {
    this.eventContinues = "";
    this.eventModel = new EventModel(
      eventName,
      positionPercentage,
      colorIndex,
      colIndex,
      eventId
    );
    this.EventView = new EventView(
      parentElement,
      positionPercentage,
      colIndex,
      eventId
    );
  }

  UpdateEventModelData() {
    this.eventModel.UpdateModelData();
  }

  GetEventModelData() {
    return this.eventModel.GetModelData();
  }

  SetEventData(eventData) {
    this.eventModel.UpdateModelData(eventData);
    this.EventView.UpdateEventUi(eventData);
  }

  RemoveEvent() {
    this.EventView.RemoveEvent();
  }
}

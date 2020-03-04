import EventView from "../views/eventView";
import EventModel from "../models/EventModel";
export default class Event {
  constructor(
    positionPercentage,
    parentElement,
    colIndex,
    eventId,
    eventName,
    colorIndex = 6
  ) {
    this.eventContinues = "";
    this.eventModel = new EventModel(
      eventName,
      positionPercentage,
      colorIndex,
      colIndex,
      eventId
    );
    const [startTime,endTime] = this.eventModel.GetEventTimes();
    this.eventView = new EventView(
      parentElement,
      positionPercentage,
      colIndex,
      eventId,
      startTime,
      endTime
    );
  }

  UpdateEvent(eventData){
    this.eventModel.UpdateModelData(eventData);
    this.eventView.UpdateEventUi(eventData);
  }

  UpdateEventModelData() {
    this.eventModel.UpdateModelData();
  }

  GetEventModelData() {
    return this.eventModel.GetModelData();
  }

  SetEventData(eventData) {
    this.eventModel.UpdateModelData(eventData);
    this.eventView.UpdateEventUi(eventData);
  }

  RemoveEvent() {
    this.eventView.RemoveEvent();
  }
}

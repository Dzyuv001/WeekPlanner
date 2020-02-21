import EventView from "../views/EventView";
export default class Event {
  constructor(timePosition, element) {
    const eventData = this._CalcTime(timePosition);
    this.startTime = eventData.startTime;
    this.endTime = eventData.endTime;
    this.eventContinues = "";
    this.CreateEventUI(element, timePosition);
  }

  CreateEventUI(element, timePosition) {
    console.log("element is ", element);
    //change time position value to a percentage so 
    //that the view can correctly position the element
    const percentage = timePosition/96 *  100;
    EventView.RenderEvent(element, percentage);
  }

  SetTimes() {}

  _CalcTime(timePosition) {
    let hour, minute;
    hour = Math.floor(timePosition / 24);
    minute = timePosition % 4;
    let endHour = 0;
    let eventContinues = false;
    if (!(hour + 1 > 23)) {
      endHour = hour + 1;
      eventContinues = true;
    }

    let eventData = {
      startTime: `${hour}:${minute}`,
      endTime: `${endHour}:${minute}`,
      eventContinues
    };
    return eventData;
  }
}

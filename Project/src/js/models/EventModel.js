export default class EventModel {
  constructor(eventName, timePosition, colorIndex) {
    const eventData = this._CalcTime(timePosition);
    this.startTime = eventData.startTime;
    this.endTime = eventData.endTime;
    this.eventId = eventData;
    this.eventName = eventName;
    this.timePosition = timePosition;
    this.colorIndex = colorIndex;
  }

  UpdateModelData(data) {}

  GetModelData() {
    return {
      name: this.eventName,
      colorIndex: this.colorIndex,
      startTime: this.startTime,
      endTime: this.endTime,
      eventId: this.eventName
    };
  }

  GetEventTimes() {
    return [this.startTime, this.endTime];
  }

  _FormatTimeInput(time) {
    return time > 9 ? time : "0" + time;
  }

  _CalcTime(timePosition) {
    let hour, minute;
    hour = Math.trunc(timePosition / 4);
    minute = (timePosition % 4) * 15;
    minute = this._FormatTimeInput(minute);
    let endHour = 0;
    let eventContinues = true;
    if (!(hour + 1 > 23)) {
      endHour = hour + 1;
      eventContinues = false;
    }
    hour = this._FormatTimeInput(hour);
    endHour = this._FormatTimeInput(endHour);

    let eventTimes = {
      startTime: `${hour}:${minute}`,
      endTime: `${endHour}:${minute}`,
      eventContinues
    };
    return eventTimes;
  }
}

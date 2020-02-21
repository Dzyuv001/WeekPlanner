import Event from "./EventController";
import WeekDayView from "../views/WeekDayView";
import WeekDayModel from "../models/WeekDayModel";

export default class WeekDay {
  constructor(element, WeekDayName, index) {
    this.Events = [];
    this.element =  WeekDayView.RenderView(element, WeekDayName, index);
  }

  AddEventToDay(yPositionPercent, colIndex){
    this.Events.push(new Event(yPositionPercent,this.element,colIndex));
  }

}

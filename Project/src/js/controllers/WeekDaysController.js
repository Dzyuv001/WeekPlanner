import Event from "./EventController";
import WeekDayView from "../views/WeekDayView";
import WeekDayModel from "../models/WeekDayModel";

export default class WeekDay {
    constructor (element,WeekDayName){
        this.Events = [];
        WeekDayView.RenderView(element,WeekDayName);
    }


}
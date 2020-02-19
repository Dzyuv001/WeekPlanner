import WeekPlannerView from "../views/WeekPlannerView";
import WeekDay from "../controllers/WeekDaysController";
import WeekPlannerModel from "../models/WeekPlannerModel";

export default class WeekPlanner {
  constructor(element, config, data) {
    this.WeekPlannerView = new WeekPlannerView();
    this.WeekPlannerView.RenderView(element);
    this.WeekPlannerModel = new WeekPlannerModel();
    this.WeekDays = [];
    const WeekDayNames = this._GetDayData();
    this._ConfigureWeekDays(element, WeekDayNames);
  }

  _GetDayData() {
    return this.WeekPlannerModel.GetDayTitles();
  }

  _ConfigureWeekDays(element,WeekDayNames) {
    for (let i = 0; i < 6; i++) {
      this.WeekDays.push(new WeekDay(element, WeekDayNames[i]));
    }
  }
}

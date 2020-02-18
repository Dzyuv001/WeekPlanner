import WeekPlannerView from "../views/WeekPlannerView";
import WeekDay from "../controllers/WeekDaysController";
import WeekPlannerModel from "../models/WeekPlannerModel";

export default class WeekPlanner {
  constructor(element, config, data) {
    this.WeekDays = [];
    this.WeekPlannerView = new WeekPlannerView();
    this.WeekPlannerView.RenderView(element);
    this.WeekPlannerModel = new WeekPlannerModel();
    this._ConfigureWeekDays();
  }

  _GetDayData(){
return this.WeekPlannerModel.GetDayData
  }

  _ConfigureWeekDays() {
    for (let i = 0; i < 6; i++) {
        this.WeekDays.push(new WeekDay());
    }
  }
}

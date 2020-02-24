import WeekPlannerView from "../views/WeekPlannerView";
import WeekDay from "../controllers/WeekDaysController";
import WeekPlannerModel from "../models/WeekPlannerModel";
import EventEditForm from "../controllers/EventEditFormController";

export default class WeekPlanner {
  constructor(element, config, data) {
    this.WeekPlannerView = new WeekPlannerView(element);
    this.WeekPlannerView.RenderView();
    this.WeekPlannerModel = new WeekPlannerModel();
    this.WeekDays = [];
    const WeekDayData = this._GetDayData();
    this._ConfigureWeekDays(element, WeekDayData);
    this._Events(element);
    this.EventEditForm = new EventEditForm(this.WeekPlannerView.GetRootElement());
  }

  _GetDayData() {
    return this.WeekPlannerModel.GetDayTitles();
  }

  _ConfigureWeekDays(element, WeekDayData) {
    for (let i = 0; i < 7; i++) {
      this.WeekDays.push(new WeekDay(element, WeekDayData[i], i));
    }
  }

  _Events(element) {
    document.getElementsByClassName(element)[0].addEventListener("click", e => {
      if (e.target && e.target.classList.contains("wkPlan-col__day")) {
        //used to get the percentage click position
        const dataValues = e.target.getAttribute("data-value").split("_");
        const colIndex = dataValues[0];
        const actualDayIndex = dataValues[1];
        let yPositionPercent = Math.floor(
          (e.offsetY / e.target.offsetHeight) * 96
        );
        this.WeekDays[colIndex].AddEventToDay(yPositionPercent, colIndex);
      }
      if (e.target && e.target.classList.contains("wkPlan-event")){
        //position one is set to the column and position two is set to event id.
          let dataValueArray = e.target.getAttribute("data-value").split("_");
          this.EventEditForm.ShowEditForm();
          e.target.style.backgroundColor = "red";
      }
    });
  }
}

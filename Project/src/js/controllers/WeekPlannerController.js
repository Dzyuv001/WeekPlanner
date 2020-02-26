import WeekPlannerView from "../views/WeekPlannerView";
import WeekDay from "../controllers/WeekDaysController";
import WeekPlannerModel from "../models/WeekPlannerModel";
import EventEditForm from "../controllers/EventEditFormController";
import States from "../models/State";
export default class WeekPlanner {
  constructor(element, config, data) {
    this.WeekPlannerView = new WeekPlannerView(element);
    this.WeekPlannerView.RenderView();
    this.WeekPlannerModel = new WeekPlannerModel();
    this.WeekDays = [];
    const WeekDayData = this._GetDayData();
    this._ConfigureWeekDays(element, WeekDayData);
    this._Events(element);
    this.EventEditForm = new EventEditForm(
      this.WeekPlannerView.GetRootElement()
    );
    this._state = new States();
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
    this.WeekPlannerView.GetRootElement().addEventListener("click", e => {
      e.preventDefault();
      if (e.target) {
        const yPositionElement = Math.floor(
          (e.offsetY / e.target.offsetHeight) * 100
        );
        const xPositionElement = Math.floor(
          (e.offsetX / e.target.offsetWidth) * 100
        );
        if (e.target.classList.contains("wkPlan-col__day")) {
          if (this._state.GetEventSavedState()) {
            this._state.SetEventSavedState(false);
          } else {
            const [
              dayIndex,
              eventIndex
            ] = this._state.GetCurrentEventPosition();
            console.log(this.WeekDays[dayIndex]);
            this.WeekDays[dayIndex].RemoveEventFromDay(dayIndex, eventIndex);
          }
          //used to get the percentage click position
          const dataValues = e.target.getAttribute("data-value").split("_");
          const colIndex = dataValues[0];
          const actualDayIndex = dataValues[1];
          const yTimePosition = (yPositionElement / 100) * 96;
          const currentDay = this.WeekDays[colIndex];
          currentDay.AddEventToDay(yTimePosition, colIndex);

          //figure out where the edit form should display
          const isLeftPosition = colIndex > 3 ? true : false;
          this.EventEditForm.ShowEditForm(isLeftPosition);

          //Update the state machine
          const eventIndex = currentDay.GetCurrentEventIndex();
          this._state.SetCurrentEventPosition(colIndex, eventIndex);
          this._state.SetEventSavedState(false);
        }

        if (e.target.classList.contains("wkPlan-event")) {
          //position one is set to the column and position two is set to event id.
          let dataValueArray = e.target.getAttribute("data-value").split("_");
          const isLeftPosition = dataValueArray[0] > 4 ? true : false;
          this.EventEditForm.ShowEditForm(isLeftPosition);
        }
        if (e.target.classList.contains("wkPlan-colorpicker__color")) {
          const colorpickedClass = "wkPlan-colorpicker__color-picked";
          let currentlySelected = e.target.parentNode.getElementsByClassName(
            colorpickedClass
          )[0];
          if (
            typeof currentlySelected != "undefined" &&
            currentlySelected != null
          ) {
            currentlySelected.classList.remove(colorpickedClass);
          }
          e.target.classList.add(colorpickedClass);
        }
        if (e.target.classList.contains("wkPlan-editform--save")) {
        }
        if (e.target.classList.contains("wkPlan-editform--cancel")) {
          this.EventEditForm.HideEditForm();
        }
      }
    });
  }
}

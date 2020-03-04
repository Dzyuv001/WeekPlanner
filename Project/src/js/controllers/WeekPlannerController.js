import WeekPlannerView from "../views/WeekPlannerView";
import WeekDay from "../controllers/WeekDaysController";
import WeekPlannerModel from "../models/WeekPlannerModel";
import EventEditForm from "../controllers/EventEditFormController";
import States from "../models/State";
import EventDto from "../models/Dto/EventDto";
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

  _EventDelete() {
    const [dayIndex, eventIndex] = this._state.GetCurrentEventPosition();
    this.WeekDays[dayIndex].RemoveEventFromDay(dayIndex, eventIndex);
    this._state.SetEventSavedState(true);
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
            this._EventDelete();
          }
          //used to get the percentage click position
          const dataValues = e.target.getAttribute("data-value").split("_");
          const colIndex = dataValues[0];
          const actualDayIndex = dataValues[1];
          const currentDay = this.WeekDays[colIndex];
          currentDay.AddEventToDay(yPositionElement, colIndex);

          //update the edit form to reflect the new event
          const eventIndex = currentDay.GetCurrentEventIndex();
          const eventData = currentDay.GetSelectedEventData(eventIndex);
          this.EventEditForm.PassDataForUiUpdate(eventData);

          //figure out where the edit form should display
          const isLeftPosition = colIndex > 3 ? true : false;
          this.EventEditForm.ShowEditForm(isLeftPosition);

          //Update the state machine
          this._state.SetCurrentEventPosition(colIndex, eventIndex);
          this._state.SetEventSavedState(false);
        }

        if (e.target.classList.contains("wkPlan-event")) {
          //position one is set to the column and position two is set to event id.
          let [dayIndex, eventIndex] = e.target
            .getAttribute("data-value")
            .split("_");
          const isLeftPosition = dayIndex > 4 ? true : false;
          this.EventEditForm.ShowEditForm(isLeftPosition);
          this._state.SetCurrentEventPosition(dayIndex, eventIndex);
        }
        if (e.target.classList.contains("wkPlan-colorpicker__color")) {
          const selectedColor = this.EventEditForm.GetPickedColor(e.target);
          const [dayIndex, eventIndex] = this._state.GetCurrentEventPosition();
          const userInput = new EventDto(selectedColor);
          this.WeekDays[dayIndex].SetSelectedEvenData(eventIndex, userInput);
        }
        if (e.target.classList.contains("wkPlan-editform--save")) {
          const eventData = this.EventEditForm.GetEditFormData();
          const [dayIndex, eventIndex] = this._state.GetCurrentEventPosition();
          if (eventData !== -1) {
            this.WeekDays[dayIndex].UpdateEvent(eventIndex, eventData);
            this.EventEditForm.HideEditForm();
            this._state.SetEventSavedState(true);
          }
        }
        if (e.target.classList.contains("wkPlan-editform--cancel")) {
          this.EventEditForm.HideEditForm();
          this._EventDelete();
        }
      }
    });
  }
}

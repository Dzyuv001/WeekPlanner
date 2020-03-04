import Util from "../views/util";
import colorArray from "../JSON/ColorNames.json";
import EventDto from "../models/Dto/EventDto";

export default class EventEditFromView {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.formElement = this._RenderMarkup(rootElement);
  }

  GetFormData() {
    if (this._ValidateDate()) {
      const formData = {};
      return formData;
    }
  }

  ShowEditFrom(isLeftPosition) {
    const parentClassName = "wkPlan-editform__position";
    const positionClassNames = [
      parentClassName + "--left",
      parentClassName + "--right"
    ];
    const positionClass = isLeftPosition
      ? positionClassNames[0]
      : positionClassNames[1];
    positionClassNames.forEach(e => {
      this.formElement.classList.remove(e);
    });
    this.formElement.classList.add(parentClassName);
    this.formElement.classList.add(positionClass);
    this.formElement.classList.add("show");
    this.formElement.classList.remove("hide");
  }

  HideEditForm() {
    this.formElement.classList.add("hide");
    this.formElement.classList.remove("show");
  }

  UpdateEditFrom(eventData) {
    this.formElement.querySelector("#txtEventName").value = eventData.name;
    this.formElement.querySelector("#txtStartTime").value = eventData.startTime;
    this.formElement.querySelector("#txtEndTime").value = eventData.endTime;
    const pickedColorClass = "wkPlan-colorpicker__color-picked";
    this.formElement
      .querySelector(`.${pickedColorClass}`)
      .classList.remove(pickedColorClass);
    //
    const colors = this.formElement.querySelectorAll(
      ".wkPlan-colorpicker__color"
    );
    colors[eventData.colorIndex].classList.add(pickedColorClass);
  }

  GetEditFromData() {
    if (this._ValidateDate()) {
      const eventName = this.formElement.querySelector("#txtEventName").value;
      const eventStartTime = this.formElement.querySelector("#txtStartTime")
        .value;
      const eventEndTime = this.formElement.querySelector("#txtEndTime").value;
      console.log(
        this.formElement.querySelector(".wkPlan-colorpicker__color-picked")
      );
      const eventColorIndex = this.formElement
        .querySelector(".wkPlan-colorpicker__color-picked")
        .getAttribute("data-value");

      if (eventColorIndex === -1) {
        throw "Some thing has gone wrong, there is no color being selected";
      }

      const eventData = new EventDto(
        eventColorIndex,
        eventName,
        eventStartTime,
        eventEndTime
      );
      return eventData;
    }

    return -1;
  }

  _ClearEditForm() {
    this.formElement.getElementById("txtEventName").value = "";
  }

  _ValidateDate() {
    //loop though all the inputs and see if the inputs are correct
    return true;
  }

  GetSelectedColor(selectedColorElement) {
    //get the picked event
    const colorpickedClass = "wkPlan-colorpicker__color-picked";
    let currentlySelected = this.rootElement.getElementsByClassName(
      colorpickedClass
    )[0];

    if (typeof currentlySelected != "undefined" && currentlySelected != null) {
      currentlySelected.classList.remove(colorpickedClass);
    }
    selectedColorElement.classList.add(colorpickedClass);
    return selectedColorElement.getAttribute("data-value");
  }

  _RenderMarkup(rootElement) {
    let htmlMarkup = `
<div class="wkPlan-editform hide d-flex flex-column">
  <form>
  <div class="form-group">
      <label for="txtEventName">Event Name</label>
      <input type="text" name="txtEventName" id="txtEventName" class="form-control wkPlan-editform__textbox" />
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="txtStartTime">Start Time</label>
        <input type="time" name="txtStartTime" id="txtStartTime" class="form-control wkPlan-editform__textbox" />
      </div>
      <div class="form-group">
        <label for="txtEndTime">End Time</label>
        <input type="time" name="txtEndTime" id="txtEndTime" class="form-control wkPlan-editform__textbox" />
      </div>
    </div>
    <div class="wkPlan-editform__colors wkPlan-colorpicker d-flex justify-content- flex-wrap">
    ${this._GenerateColorPickerMarkup()}
    </div>
    <div class="form-group">
      <button class="btn btn-primary wkPlan-editform--save" type=""button">Save</button>
      <button class="btn wkPlan-editform--cancel" type=""button">Cancel</button>
    </div>
  </form>
</div>
      `;
    rootElement.insertAdjacentHTML("beforeend", htmlMarkup);
    return rootElement.querySelector(".wkPlan-editform");
  }

  SetTimeInputs(startTime, endTime) {
    const txtStartTime = this.formElement.getElementById("txtStartTime");
    const txtEndTime = this.formElement.getElementById("txtEndTime");
    txtStartTime.value = startTime;
    txtEndTime.value = endTime;
  }

  _GenerateColorPickerMarkup() {
    let htmlMarkup = "";
    colorArray.forEach((color, i) => {
      htmlMarkup += `<div class="wkPlan-colorpicker__color wkPlan-background-css--${color}" data-value="${i}"></div>`;
    });
    return htmlMarkup;
  }
}

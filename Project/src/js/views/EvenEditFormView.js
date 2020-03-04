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
    // wkPlan-validation-error__txtEventName
    // wkPlan-validation-error__txtStartTime
    // wkPlan-validation-error__txtEndTime
    // wkPlan-validation-error__duration
    // wkPlan-validation-error__colorpicked

    //loop though all the inputs and see if the inputs are correct
    let isValid = true;
    const txtEventName = this.formElement.querySelector("#txtEventName");
    const txtStartTime = this.formElement.querySelector("#txtStartTime");
    const txtEndTime = this.formElement.querySelector("#txtEndTime");
    const timeRegEx24h = new RegExp(
      "/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/",
      "i"
    );
    const errorClass = "wkPlan-validation-error";
    const errorName = this.formElement.querySelector(
      "." + errorClass + "__txtEventName"
    );
    const errorStartTime = this.formElement.querySelector(
      "." + errorClass + "__txtStartTime"
    );
    const errorEndTime = this.formElement.querySelector(
      "." + errorClass + "__txtEndTime"
    );
    const errorDuration = this.formElement.querySelector(
      "." + errorClass + "__duration"
    );
    const errorColorPicked = this.formElement.querySelector(
      "." + errorClass + "__colorpicked"
    );

    const hideErrorClass = "wkPlan-validation-error--hidden";
    const pickedColor = this.formElement.querySelector(
      ".wkPlan-colorpicker__color-picked"
    );

    if (txtEventName.value === null || txtEventName.value.match(/^ *$/)) {
      txtEventName.classList.add("is-invalid");
      isValid = false;
      errorName.innerText = "The event needs a name";
      errorName.classList.remove(hideErrorClass);
    } else {
      txtEventName.classList.remove("is-invalid");
      errorName.innerText = "";
      errorName.classList.add(hideErrorClass);
    }

    if (txtStartTime.value.match(timeRegEx24h)) {
      txtStartTime.classList.add("is-invalid");
      isValid = false;
      errorStartTime.innerText =
        "A event start time between 00:00 to 23:59 is needed";
      errorStartTime.classList.remove(hideErrorClass);
    } else {
      txtStartTime.classList.remove("is-invalid");
      errorStartTime.innerText = "";
      errorStartTime.classList.add(hideErrorClass);
    }

    if (
      txtStartTime.value === null ||
      txtStartTime.value.match(/^ *$/) ||
      txtStartTime.value.match(timeRegEx24h)
    ) {
      txtStartTime.classList.add("is-invalid");
      isValid = false;
      errorStartTime.innerText =
        "A event start time between 00:00 to 23:59 is needed";
      errorStartTime.classList.remove(hideErrorClass);
    } else {
      txtEndTime.classList.remove("is-invalid");
      errorStartTime.innerText = "";
      errorStartTime.classList.add(hideErrorClass);
    }

    if (
      txtEndTime.value === null ||
      txtEndTime.value.match(/^ *$/) ||
      txtEndTime.value.match(timeRegEx24h)
    ) {
      txtEndTime.classList.add("is-invalid");
      isValid = false;
      errorEndTime.innerText =
        "A event start time between 00:00 to 23:59 is needed";
      errorEndTime.classList.remove(hideErrorClass);
    } else {
      txtEndTime.classList.remove("is-invalid");
      errorEndTime.innerText = "";
      errorEndTime.classList.add(hideErrorClass);
    }

    const startTime = txtStartTime.value.split(":");
    const endTime = txtEndTime.value.split(":");

    if (
      (txtStartTime.value === txtEndTime.value && isValid) ||
      startTime[0] === endTime[0] ||
      startTime[0] < endTime[0] ||
      startTime[1] === endTime[1] ||
      startTime[1] < endTime[1]
    ) {
      isValid = false;
      txtStartTime.classList.add("is-invalid");
      txtEndTime.classList.add("is-invalid");
      errorDuration.innerText =
        "Event must have a started time lower than the end time";
      errorDuration.classList.remove(hideErrorClass);
    } else {
      txtStartTime.classList.remove("is-invalid");
      txtEndTime.classList.remove("is-invalid");
      errorDuration.classList.add(hideErrorClass);
      errorDuration.innerText = "";
    }

    if (!pickedColor) {
      isValid = false;
      errorDuration.innerText = "Color not picked";
      errorDuration.classList.remove(hideErrorClass);
    } else {
      errorDuration.innerText = "";
      errorDuration.classList.add(hideErrorClass);
    }
    return isValid;
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
      <p class="wkPlan-validation-error  wkPlan-validation-error--hidden wkPlan-validation-error__txtEventName"></p>
      </div>
    <div class="d-flex justify-content-between">
      <div class="form-group">
        <label for="txtStartTime">Start Time</label>
        <input type="time" name="txtStartTime" id="txtStartTime" class="form-control wkPlan-editform__textbox" />
        <p class="wkPlan-validation-error  wkPlan-validation-error--hidden wkPlan-validation-error__txtStartTime"></p>
        </div>
      <div class="form-group">
        <label for="txtEndTime">End Time</label>
        <input type="time" name="txtEndTime" id="txtEndTime" class="form-control wkPlan-editform__textbox" />
        <p class="wkPlan-validation-error  wkPlan-validation-error--hidden wkPlan-validation-error__txtEndTime"></p>
        </div>
        <p class="wkPlan-validation-error  wkPlan-validation-error--hidden wkPlan-validation-error__duration"></p>
    </div>
    <div class="wkPlan-editform__colors wkPlan-colorpicker d-flex justify-content- flex-wrap">
    ${this._GenerateColorPickerMarkup()}
    </div>
    <p class="wkPlan-validation-error  wkPlan-validation-error--hidden wkPlan-validation-error__colorpicked"></p>
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

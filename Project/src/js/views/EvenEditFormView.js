import Util from "../views/util";
export default class EventEditFromView {
  constructor(rootElement) {
    this.formElement = this._RenderMarkup(rootElement);
  }

  GetFormData() {
    if (this._ValidateDate()) {
      const formData = {};
      return formData;
    }
  }

  ShowEditFrom() {
    this.formElement.classList.add("show");
    this.formElement.classList.remove("hide");
  }

  HideEditForm() {
    this.formElement.classList.add("hide");
    this.formElement.classList.remove("show");
  }

  _ValidateDate() {
    //loop though all the inputs and see if the inputs are correct
    return true;
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
        <input type="text" name="txtStartTime" id="txtStartTime" class="form-control wkPlan-editform__textbox" />
      </div>
      <div class="form-group">
        <label for="txtEndTime">End Time</label>
        <input type="text" name="txtEndTime" id="txtEndTime" class="form-control wkPlan-editform__textbox" />
      </div>
    </div>
    <div class="wkPlan-editform__colors wkPlan-colorpicker d-flex justify-content- flex-wrap">
    ${this._GenerateColorPickerMarkup()}
    </div>
    <div class="form-group">
      <button class="btn btn-primary wkPlan-editForm--save" type=""button">Save</button>
      <button class="btn wkPlan-editForm--cancel" type=""button">Cancel</button>
    </div>
  </form>
</div>
      `;
    rootElement.insertAdjacentHTML("beforeend", htmlMarkup);
    return rootElement.querySelector(".wkPlan-editform");
  }

  _GenerateColorPickerMarkup() {
    let htmlMarkup = "";
    const colorArray = [
      "red",
      "pink",
      "purple",
      "darkpurple",
      "indigo",
      "blue",
      "dodgerblue",
      "cyan",
      "teal",
      "green",
      "lightgreen",
      "lime",
      "yellow",
      "amber",
      "orange",
      "brown",
      "gray",
      "bluegray"
    ];
    colorArray.forEach(color => {
      htmlMarkup += `<div class="wkPlan-colorpicker__color wkPlan-colorpicker__color--${color}"></div>`;
    });
    let elementTemplate = `<div class="wkPlan-colorpicker__color wkPlan-colorpicker__color-"></div>`;
    return htmlMarkup;
  }
}

import EventEditFormView from "../views/EvenEditFormView";

export default class EventEditForm {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.EventEditFormView = new EventEditFormView(rootElement);
  }

  GetEditFormData() {
    return EventEditFormView.GetEditFromData();
  }

  HideEditForm() {
    this.EventEditFormView.HideEditForm();
  }

  PassDataForUiUpdate(eventData){
    this.EventEditFormView.UpdateEditFrom(eventData);
  }

  ShowEditForm(isLeftPosition, startTime, endTime) {
    this.EventEditFormView.ShowEditFrom(isLeftPosition, startTime, endTime);
  }
}

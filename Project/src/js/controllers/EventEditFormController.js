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

  ShowEditForm(isLeftPosition) {
    this.EventEditFormView.ShowEditFrom(isLeftPosition);
  }
}

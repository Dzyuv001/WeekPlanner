import EventEditFormView from "../views/EvenEditFormView";

export default class EventEditForm {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.EventEditFormView = new EventEditFormView(rootElement);
  }

  GetEditFormData() {
    return EventEditFormView.GetEditFromData();
  }

  HideEditForm() {}

  ShowEditForm() {
    let posX, posY;
    this.EventEditFormView.ShowEditFrom(posX, posY);
  }
}

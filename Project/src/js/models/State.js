export default class State {
  constructor() {
    this.lastEventDay = -1;
    this.lastEventIndex = -1;
    this.currentEventDay = -1;
    this.currentEventIndex = -1;
    this.saved = true;
  }

  GetLastEventPosition() {
    return [this.lastEventIndex, this.lastEventDay];
  }
  SetLastEventPosition(lastEventIndex, lastEventDay) {
    this.lastEventIndex = lastEventIndex;
    this.lastEventDay = lastEventIndex;
  }

  GetCurrentEventPosition() {
    return [this.currentEventIndex, this.currentEventDay];
  }

  SetCurrentEventPosition(currentEventIndex, currentEventDay) {
    this.currentEventIndex = currentEventIndex;
    this.currentEventDay = currentEventDay;
  }

  SetEventSavedState(isSaved) {
    this.saved = isSaved;
  }

  GetEventSavedState() {
    return this.saved;
  }
}

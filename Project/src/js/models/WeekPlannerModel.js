import WeekDayData from "../JSON/DaysOfWeekNames.json";
import Iso2Code from "../JSON/iso2DigitCodes.json";
import * as Util from "./util";

export default class WeekPlanner {
  constructor(weekStart = 0, language = "gb", nameLength = "fullDayNames") {
    this.weekStart = this._ValidateWeekStart(weekStart);
    this.language = this._ValidateLanguage(language);
    this.length = this._ValidateNameLength(nameLength);
  }

  _ValidateWeekStart(weekStart) {
    if (!Number.isNaN(weekStart)) {
      if (Number.isInteger(weekStart)) {
        if (weekStart > -1 && weekStart < 7) {
          return weekStart;
        }
        throw "WeekStart must be between 0-6 ";
      }
      throw "WeekStart must be an integer";
    }
    throw "WeekStart is not a number";
  }

  _ValidateNameLength(nameLength) {
    for (let i = 0; i < Util.dayLengthNames.length; i++) {
      if (Util.dayLengthNames[i] === nameLength) {
        return nameLength;
      }
    }
    throw "Invalid option input options include " +
      Util.dayLengthNames.toString();
  }

  _ValidateLanguage(language) {
    if (isNaN(language)) {
      var isoCodeString = Iso2Code.toString().toLowerCase();
      language = language.toLowerCase();
      if (isoCodeString.includes(language)) {
        return language;
      }
      throw "- Invalid Iso code see list at https://www.iso.org/obp/ui/#search/code/";
    }
    throw "Language value must be set to 2 char iso code see list on https://www.iso.org/obp/ui/#search/code/";
  }

  GetDayTitles() {
    const names = WeekDayData[this.language][this.length];
    let dayData = [];
    names.forEach((name, i) => {
      dayData.push({ name, index:i });
    });
    if (this.weekStart != 0) {
      var lastElements = dayData.slice(this.weekStart, names.language);
      dayData = lastElements.push(dayData);
    }
    return dayData;
  }
}

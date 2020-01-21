"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../commons/Helpers");
class InnerDate {
    constructor(fullDate) {
        this._isValidDate = true;
        let datePart = Helpers_1.Attributes.IsValid(fullDate) ? fullDate.split('-') : undefined;
        if (Helpers_1.Attributes.IsValid(datePart)) {
            this.Year = LeftZero(datePart[0]);
            this.Month = LeftZero(datePart[1]);
            this.Day = LeftZero(datePart[2]);
            this.FullDate = fullDate;
        }
        else {
            this._isValidDate = false;
        }
    }
    getFullDate() {
        return this._isValidDate ? `${this.Year}-${this.Month}-${this.Day}` : undefined;
    }
    Now() {
        let _date = new Date();
        this.Year = LeftZero(_date.getFullYear());
        this.Month = LeftZero(_date.getMonth() + 1);
        this.Day = LeftZero(_date.getDay());
        this.FullDate = `${this.Year}-${this.Month}-${this.Day}`;
        return this;
    }
}
exports.InnerDate = InnerDate;
function LeftZero(value) {
    let result = ' ';
    if (value != undefined && value != null) {
        result = value.toString();
        if (value.toString().length == 1) {
            result = `0${value.toString()}`;
        }
    }
    return result;
}
//# sourceMappingURL=InnerDate.js.map
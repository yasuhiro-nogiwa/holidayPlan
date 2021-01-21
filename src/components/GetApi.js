"use strict";
exports.__esModule = true;
var JsonFileManager_1 = require("./JsonFileManager");
// データ取得
function GetApi(item, month) {
    if (month === void 0) { month = "dummy"; }
    var ret;
    var fileManager = JsonFileManager_1.JsonFileManager.getInstance();
    if (item === "name" || item === "totalHoriday") {
        ret = fileManager.GetPersonalData(item);
    }
    else {
        ret = fileManager.GetHolidayData(item, month);
    }
    return ret;
}
exports["default"] = GetApi;
console.log(GetApi("name"));
console.log(GetApi("comment"));
console.log(GetApi("schedule", "aplil"));
console.log(GetApi("schedule", "december"));

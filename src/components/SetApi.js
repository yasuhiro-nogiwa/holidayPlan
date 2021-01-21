"use strict";
exports.__esModule = true;
var JsonFileManager_1 = require("./JsonFileManager");
// データ設定
function SetApi(item, month, value) {
    var fileManager = JsonFileManager_1.JsonFileManager.getInstance();
    if (item === "name" || item === "totalholiday") {
        // 個人情報データ設定
        fileManager.SetPersonalData(item, value);
    }
    else {
        // 有給休暇データ設定
        fileManager.SetHolidayData(month, item, value);
    }
}
exports["default"] = SetApi;
SetApi("schedule", "aplil", 11);
SetApi("name", "dummy", "Taro");

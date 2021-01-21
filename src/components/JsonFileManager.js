"use strict";
exports.__esModule = true;
exports.JsonFileManager = void 0;
// JSONファイル管理クラス
var JsonFileManager = /** @class */ (function () {
    // コンストラクター
    function JsonFileManager() {
        this.Position = {
            "aplil": 0,
            "may": 1,
            "june": 2,
            "july": 3,
            "august": 4,
            "september": 5,
            "october": 6,
            "november": 7,
            "december": 8,
            "january": 9,
            "february": 10,
            "march": 11,
            "dummy": -1
        };
        this.Name = "";
        this.TotalHoriday = 0;
        this.TargetHoliday = 0;
        this.Schedule = Array(12).fill(0);
        this.Plan = Array(12).fill(0);
        this.Sudden = Array(12).fill(0);
        this.Comment = "";
    }
    // インスタンス取得
    JsonFileManager.getInstance = function () {
        // _inctanceが存在しない場合に、new JsonFileManager()を実行する。
        if (!this._instance) {
            this._instance = new JsonFileManager();
        }
        // 生成済みのインスタンスを返す
        return this._instance;
    };
    // JSON個人情報ファイル読み込み
    JsonFileManager.prototype.loadPersonalFile = function (filePath) {
        // ファイル読み込み
        var fs = require('fs');
        var jsonObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        var tempData = jsonObject.PersonalData;
        this.Name = tempData.Name; // 名称
        this.TotalHoriday = tempData.TotalHoriday; // 年休総数
    };
    // JSON個人情報ファイル書き込み
    JsonFileManager.prototype.savePersonalFile = function (filePath) {
        var fs = require('fs');
        var saveData = {
            Name: this.Name,
            TotalHoriday: this.TotalHoriday // 年休総数
        };
        // ファイル書き込み
        var jsonObject = JSON.stringify({ PersonalData: saveData }, null, ' ');
        fs.writeFileSync(filePath, jsonObject);
    };
    // JSON有給休暇ファイル読み込み
    JsonFileManager.prototype.loadHolidayFile = function (filePath) {
        // ファイル読み込み
        var fs = require('fs');
        var jsonObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        var tempData = jsonObject.HolidayData;
        this.TargetHoliday = tempData.TargetHoliday; // 年末目標残数
        this.Schedule = tempData.Schedule; // 取得予定
        this.Plan = tempData.Plan; // 計画休数
        this.Sudden = tempData.Sudden; // 突発休数
        this.Comment = tempData.Comment; // 振り返り
    };
    // JSON有給休暇ファイル書き込み
    JsonFileManager.prototype.saveHolidayHolidayFile = function (filePath) {
        var fs = require('fs');
        var saveData = {
            TargetHoliday: this.TargetHoliday,
            Schedule: this.Schedule,
            Plan: this.Plan,
            Sudden: this.Sudden,
            Comment: this.Comment
        };
        // ファイル書き込み
        var jsonObject = JSON.stringify({ HolidayData: saveData }, null, ' ');
        fs.writeFileSync(filePath, jsonObject);
    };
    // 現時点残数計算
    JsonFileManager.prototype.getRemain = function () {
        var totalPlan = this.Plan.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        var totalSudden = this.Sudden.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        // 年休総数-(計画休総数+突発休総数)
        return this.TotalHoriday - (totalPlan + totalSudden);
    };
    // 円グラフの計画休
    JsonFileManager.prototype.getTotalPlan = function () {
        // 計画休総数
        var ret = this.Plan.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        return ret;
    };
    // 円グラフの突発休
    JsonFileManager.prototype.getTotalSudden = function () {
        // 突発休総数
        var ret = this.Sudden.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        return ret;
    };
    // 棒グラフ(月ごとの計画休数累計+月ごとの突発休数累計)
    JsonFileManager.prototype.getMonthlyHoliday = function (month) {
        var ret = 0;
        for (var i = 0; i < month; i++) {
            // 計画休+突発休
            ret += this.Plan[i] + this.Sudden[i];
        }
        return ret;
    };
    // 折れ線グラフの予定(年休総数-月ごとの取得予定累計)
    JsonFileManager.prototype.getMonthlySchedule = function (month) {
        var totalSchedule = 0;
        for (var i = 0; i < month; i++) {
            // 取得予定
            totalSchedule += this.Schedule[i];
        }
        return this.TotalHoriday - totalSchedule;
    };
    // 折れ線グラフの実行(年休総数-(月ごとの計画休数累計+月ごとの突発休数累計)
    JsonFileManager.prototype.getMonthlyExecute = function (month) {
        var totalExecute = 0;
        for (var i = 0; i < month; i++) {
            // 計画休+突発休
            totalExecute += this.Plan[i] + this.Sudden[i];
        }
        return this.TotalHoriday - totalExecute;
    };
    // 個人情報データ取得API
    JsonFileManager.prototype.GetPersonalData = function (item) {
        var ret;
        // JSONファイル読み込み
        this.loadPersonalFile("./PersonalData.json");
        if (item === "name") {
            // 名称
            ret = this.Name;
        }
        else if (item === "totalHoriday") {
            // 年休総数
            ret = this.TotalHoriday;
        }
        return ret;
    };
    // 有給休暇データ取得API
    JsonFileManager.prototype.GetHolidayData = function (item, month) {
        var ret;
        // JSONファイル読み込み
        this.loadPersonalFile("./PersonalData.json");
        this.loadHolidayFile("./HolidayData.json");
        // 月から配列の番号を取得
        var index = this.Position[month];
        if (item === "targetHoliday") {
            // 年末目標残数
            ret = this.TargetHoliday;
        }
        else if (item === "schedule") {
            // 取得予定
            ret = this.Schedule[index];
        }
        else if (item === "plan") {
            // 計画休数
            ret = this.Plan[index];
        }
        else if (item === "sudden") {
            // 突発休数
            ret = this.Sudden[index];
        }
        else if (item === "comment") {
            // 振り返り
            ret = this.Comment;
        }
        else if (item === "remain") {
            // 現時点残数計算
            ret = this.getRemain();
        }
        else if (item === "remain") {
            // 現時点残数計算
            ret = this.getRemain();
        }
        else if (item === "totalplan") {
            // 計画休総数
            ret = this.getTotalPlan();
        }
        else if (item === "totalsudden") {
            // 突発休総数
            ret = this.getTotalSudden();
        }
        else if (item === "totalsudden") {
            // 突発休総数
            ret = this.getTotalSudden();
        }
        else if (item === "monthlyholiday") {
            // 月ごとの計画休数累計+月ごとの突発休数累計
            ret = this.getMonthlyHoliday(index);
        }
        else if (item === "getmonthlyschedule") {
            // 年休総数-月ごとの取得予定累計
            ret = this.getMonthlySchedule(index);
        }
        else if (item === "getmonthlyexecute") {
            // 年休総数-(月ごとの計画休数累計+月ごとの突発休数累計
            ret = this.getMonthlyExecute(index);
        }
        return ret;
    };
    // 個人情報データ設定API
    JsonFileManager.prototype.SetPersonalData = function (item, value) {
        // JSONファイル読み込み
        this.loadPersonalFile("./PersonalData.json");
        if (item === "name") {
            // 名称
            this.Name = value;
        }
        else if (item === "totalHoriday") {
            // 年休総数
            this.TotalHoriday = value;
        }
        // JSONファイル書き込み
        this.savePersonalFile("./PersonalData.json");
    };
    // 有給休暇データ設定API
    JsonFileManager.prototype.SetHolidayData = function (month, item, value) {
        // JSONファイル読み込み
        this.loadHolidayFile("./HolidayData.json");
        // 月から配列の番号を取得
        var index = this.Position[month];
        if (item === "targetHoliday") {
            // 年末目標残数
            this.TotalHoriday = value;
        }
        else if (item === "schedule") {
            // 取得予定
            this.Schedule[index] = value;
        }
        else if (item === "plan") {
            // 計画休数
            this.Plan[index] = value;
        }
        else if (item === "sudden") {
            // 突発休数
            this.Sudden[index] = value;
        }
        else if (item === "comment") {
            // 振り返り
            this.Comment = value;
        }
        // JSONファイル書き込み
        this.saveHolidayHolidayFile("./HolidayData.json");
    };
    return JsonFileManager;
}());
exports.JsonFileManager = JsonFileManager;

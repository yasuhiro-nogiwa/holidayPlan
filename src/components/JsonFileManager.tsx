import { isNumber } from "util";

// JSONファイル管理クラス
export class JsonFileManager
{    
    Name: string;   // 名称
    TotalHoliday: number;   // 年休総数
    TargetHoliday: number;  // 年末目標残数
    Schedule: Array<number>;    // 取得予定
    Plan: Array<number>;    // 計画休数
    Sudden: Array<number>;  // 突発休数
    Comment: string;    // 振り返り
 
    Position: {[key: string]: number}=
    {
        "april": 0,
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

    // インスタンス
    private static _instance: JsonFileManager;

    // インスタンス取得
    public static getInstance(): JsonFileManager
    {
        // _inctanceが存在しない場合に、new JsonFileManager()を実行する。
        if (!this._instance)
        {
            this._instance = new JsonFileManager();            
        }
  
        // 生成済みのインスタンスを返す
        return this._instance;
    }

    // コンストラクター
    private constructor()
    {
        this.Name = "";
        this.TotalHoliday = 0;
        this.TargetHoliday = 0;
        this.Schedule = Array(12).fill(0);
        this.Plan = Array(12).fill(0);
        this.Sudden = Array(12).fill(0);
        this.Comment = "";

        // lodalStorageデータ取得
        this.loadPersonalData();
        this.loadHolidayData();
    }

    // localStorageチェック
    private storageAvailable()
    {
        try
        {
            const x = '__storage_test__';
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        }
        catch(e)
        {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                localStorage.length !== 0;
        }
    }

    // JSON個人情報データ読み込み
    private loadPersonalData(): boolean
    {
        // localStorageチェック
        if(this.storageAvailable() !== true)
        {
            return false;
        }

        // localStorageからデータを取得
        const name = localStorage.getItem("Name");
        if(name != null)
        {
            this.Name = JSON.parse(name);   // 名称
        }
        const totalHoliday = localStorage.getItem("TotalHoliday");
        if(totalHoliday != null)
        {
            this.TotalHoliday = JSON.parse(totalHoliday);   // 年休総数
        }

        return true;
    }

    // JSON個人情報データ書き込み
    private savePersonalData(): boolean
    {
        // localStorageチェック
        if(this.storageAvailable() !== true)
        {
            return false;
        }

        // localStorageにデータを保存
        localStorage.setItem("Name", JSON.stringify(this.Name));    // 名称
        localStorage.setItem("TotalHoliday", JSON.stringify(this.TotalHoliday)); // 年休総数

        return true;
    }

    // JSON有給休暇データ読み込み
    private loadHolidayData(): boolean
    {
        // localStorageチェック
        if(this.storageAvailable() !== true)
        {
            return false;
        }

        // localStorageからデータを取得
        const targetHoliday = localStorage.getItem("TargetHoliday");
        if(targetHoliday != null)
        {
            this.TargetHoliday = JSON.parse(targetHoliday);  // 年末目標残数
        }
        const shedule = localStorage.getItem("Schedule");
        if(shedule != null)
        {
            this.Schedule = JSON.parse(shedule);   // 取得予定
        }
        const plan = localStorage.getItem("Plan");
        if(plan != null)
        {
            this.Plan = JSON.parse(plan);   // 計画休数
        }
        const sudden = localStorage.getItem("Sudden");
        if(sudden != null)
        {
            this.Sudden = JSON.parse(sudden); // 突発休数
        }
        const comment = localStorage.getItem("Comment");
        if(comment != null)
        {
            this.Comment = JSON.parse(comment);   // 振り返り
        }

        return true;
    }

    // JSON有給休暇データ書き込み
    private saveHolidayData(): boolean
    {
        // localStorageチェック
        if(this.storageAvailable() !== true)
        {
            return false;
        }

        // localStorageにデータを保存
        localStorage.setItem("TargetHoliday", JSON.stringify(this.TargetHoliday));  // 年末目標残数
        localStorage.setItem("Schedule", JSON.stringify(this.Schedule));    // 取得予定
        localStorage.setItem("Plan", JSON.stringify(this.Plan));    // 突発休数
        localStorage.setItem("Sudden", JSON.stringify(this.Sudden));    // 突発休数
        localStorage.setItem("Comment", JSON.stringify(this.Comment));  // 振り返り

        return true;
    }

    // 現時点残数計算
    private getRemain(): number
    {
        let totalPlan = this.Plan.reduce(function(sum, element) {
            return sum + element;            
        },0);
        let totalSudden = this.Sudden.reduce(function(sum, element) {
            return sum + element;            
        },0);

        // 年休総数-(計画休総数+突発休総数)
        return this.TotalHoliday - (totalPlan + totalSudden);
    }

    // 円グラフの計画休
    private getTotalPlan(): number
    {
        // 計画休総数
        let ret = this.Plan.reduce(function(sum, element) {
            return sum + element;            
        },0);

        return ret
    }

    // 円グラフの突発休
    private getTotalSudden(): number
    {
        // 突発休総数
        let ret = this.Sudden.reduce(function(sum, element) {
            return sum + element;            
        },0);

        return ret;
    }

    // 棒グラフ(月ごとの計画休数累計+月ごとの突発休数累計)
    private getMonthlyHoliday(month: number): number    // 月を指定
    {
        let ret = 0;
        for(let i=this.Position["april"]; i<=month; i++)
        {
            // 計画休+突発休
            ret += this.Plan[i] + this.Sudden[i];
        }

        return ret;
    }

    // 折れ線グラフの予定(年休総数-月ごとの取得予定累計)
    private getMonthlySchedule(month: number): number    // 月を指定
    {
        let totalSchedule = 0;
        for(let i=this.Position["april"]; i<=month; i++)
        {
            // 取得予定
            totalSchedule += this.Schedule[i];
        }

        return this.TotalHoliday - totalSchedule;
    }

    // 折れ線グラフの実行(年休総数-(月ごとの計画休数累計+月ごとの突発休数累計)
    private getMonthlyExecute(month: number): number    // 月を指定
    {
        let totalExecute = 0;
        for(let i=this.Position["april"]; i<=month; i++)
        {
            // 計画休+突発休
            totalExecute += this.Plan[i] + this.Sudden[i];
        }

        return this.TotalHoliday - totalExecute;
    }

    // 個人情報データ取得API
    public GetPersonalData(item: string): any
    {
        let ret: any = null;

        switch(item)
        {
            case "name":
                // 名称
                ret = this.Name;
                break;
            case "totalholiday":
                // 年休総数
                ret = this.TotalHoliday;
                break;
            default:
                ret = null;
                break;
        }

        return ret;
    }

    // 有給休暇データ取得API
    public GetHolidayData(item: string, month: string): any
    {
        let ret: any = null;

        // 月から配列の番号を取得
        let index = this.Position["dummy"];
        index = this.Position[month];

        switch(item)
        {
            case "targetholiday":
                // 年末目標残数
                ret = this.TargetHoliday;
                break;
            case "schedule":
                // 取得予定
                ret = this.Schedule[index];
                break;
            case "plan":
                // 計画休数
                ret = this.Plan[index];
                break;
            case "sudden":
                // 突発休数
                ret = this.Sudden[index];
                break;
            case "comment":
                // 振り返り
                ret = this.Comment;
                break;
            case "remain":
                // 現時点残数計算
                ret = this.getRemain();
                break;
            case "totalplan":
                // 計画休総数
                ret = this.getTotalPlan();
                break;
            case "totalsudden":
                // 突発休総数
                ret = this.getTotalSudden();
                break;
            case "monthlyholiday":
                // 月ごとの計画休数累計+月ごとの突発休数累計
                ret = this.getMonthlyHoliday(index);
                break;
            case "getmonthlyschedule":
                // 年休総数-月ごとの取得予定累計
                ret = this.getMonthlySchedule(index);
                break;
            case "getmonthlyexecute":
                // 年休総数-(月ごとの計画休数累計+月ごとの突発休数累計
                ret = this.getMonthlyExecute(index);
                break;
            default:
                ret = null;
                break;
        }
        
        return ret;
    }

    // 個人情報データ設定API
    public SetPersonalData(item: string, value: any): boolean
    {
        switch(item)
        {
            case "name":
                // 名称
                this.Name = String(value);
                break;
            case "totalholiday":
                // 年休総数
                this.TotalHoliday = Number(value);
                break;
            default:
                return false;
        }

        // lodalStorageデータ保存
        return  this.savePersonalData();
    }

    // 有給休暇データ設定API
    public SetHolidayData(month: string, item: string, value: any): boolean
    {
        // 月から配列の番号を取得
        let index = this.Position["dummy"];
        index = this.Position[month];
        
        switch(item)
        {             
            case "targetholiday":
                // 年末目標残数
                this.TargetHoliday = Number(value);
                break;
            case "schedule":
                // 取得予定
                this.Schedule[index] = Number(value);
                break;
            case "plan":
                // 計画休数                
                this.Plan[index] = Number(value);
                break;
            case "sudden":
                // 突発休数
                this.Sudden[index] = Number(value);
                break;
            case "comment":
                // 振り返り
                this.Comment = String(value);
                break;
            default:
                return false;
        }

        // lodalStorageデータ保存
        return this.saveHolidayData();
    }
}
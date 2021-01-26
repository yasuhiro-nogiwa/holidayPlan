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
    private constructor(){
        this.Name = "";
        this.TotalHoliday = 0;
        this.TargetHoliday = 0;
        this.Schedule = Array(12).fill(0);
        this.Plan = Array(12).fill(0);
        this.Sudden = Array(12).fill(0);
        this.Comment = "";
    }

    // JSON個人情報データ読み込み
    private loadPersonalData(): void
    {
        // localStorageからデータを取得
        let temp = localStorage.getItem("Name");
        if(temp != null)
        {
            this.Name = JSON.parse(temp);   // 名称
        }
        temp = localStorage.getItem("TotalHoliday");
        if(temp != null)
        {
            this.TotalHoliday = JSON.parse(temp);   // 年休総数
        }
    }

    // JSON個人情報データ書き込み
    private savePersonalData(): void
    {
        // localStorageにデータを保存
        localStorage.setItem("Name", JSON.stringify(this.Name));    // 名称
        localStorage.setItem("TotalHoliday", JSON.stringify(this.TotalHoliday)); // 年休総数
    }

    // JSON有給休暇データ読み込み
    private loadHolidayData(): void
    {
        // localStorageからデータを取得
        let temp = localStorage.getItem("TargetHoliday");
        if(temp != null)
        {
            this.TargetHoliday = JSON.parse(temp);  // 年末目標残数
        }
        temp = localStorage.getItem("Schedule");
        if(temp != null)
        {
            this.Schedule = JSON.parse(temp);   // 取得予定
        }
        temp = localStorage.getItem("Plan");
        if(temp != null)
        {
            this.Plan = JSON.parse(temp);   // 計画休数
        }
        temp = localStorage.getItem("Sudden");
        if(temp != null)
        {
            this.Sudden = JSON.parse(temp); // 突発休数
        }
        temp = localStorage.getItem("Comment");
        if(temp != null)
        {
            this.Comment = JSON.parse(temp);   // 振り返り
        }
    }

    // JSON有給休暇データ書き込み
    private saveHolidayData(): void
    {
        // localStorageにデータを保存
        localStorage.setItem("TargetHoliday", JSON.stringify(this.TargetHoliday));  // 年末目標残数
        localStorage.setItem("Schedule", JSON.stringify(this.Schedule));    // 取得予定
        localStorage.setItem("Plan", JSON.stringify(this.Plan));    // 突発休数
        localStorage.setItem("Sudden", JSON.stringify(this.Sudden));    // 突発休数
        localStorage.setItem("Comment", JSON.stringify(this.Comment));  // 振り返り
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
        for(let i=0; i<=month; i++)
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
        for(let i=0; i<=month; i++)
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
        for(let i=0; i<=month; i++)
        {
            // 計画休+突発休
            totalExecute += this.Plan[i] + this.Sudden[i];
        }

        return this.TotalHoliday - totalExecute;
    }

    // 個人情報データ取得API
    public GetPersonalData(item: string): any
    {
        let ret: any;

        // lodalStorageデータ取得
        this.loadPersonalData();

        if(item === "name")
        {
            // 名称
            ret = this.Name;
        }
        else if(item === "totalholiday")
        {
            // 年休総数
            ret = this.TotalHoliday;
        }

        return ret;
    }

    // 有給休暇データ取得API
    public GetHolidayData(item: string, month: string): any
    {
        let ret: any;

        // lodalStorageデータ取得
        this.loadPersonalData();
        this.loadHolidayData();

        // 月から配列の番号を取得
        let index = this.Position[month];

        if(item === "targetholiday")
        {
            // 年末目標残数
            ret = this.TargetHoliday;
        }
        else if(item === "schedule")
        {
            // 取得予定
            ret = this.Schedule[index];
        }
        else if(item === "plan")
        {
            // 計画休数
            ret = this.Plan[index];
        }
        else if(item === "sudden")
        {
            // 突発休数
            ret = this.Sudden[index];
        }
        else if(item === "comment")
        {
            // 振り返り
            ret = this.Comment;
        }
        else if(item === "remain")
        {
            // 現時点残数計算
            ret = this.getRemain();
        }
        else if(item === "remain")
        {
            // 現時点残数計算
            ret = this.getRemain();
        }
        else if(item === "totalplan")
        {
            // 計画休総数
            ret = this.getTotalPlan();
        }
        else if(item === "totalsudden")
        {
            // 突発休総数
            ret = this.getTotalSudden();
        }
        else if(item === "totalsudden")
        {
            // 突発休総数
            ret = this.getTotalSudden();
        }
        else if(item === "monthlyholiday")
        {
            // 月ごとの計画休数累計+月ごとの突発休数累計
            ret = this.getMonthlyHoliday(index);
        }
        else if(item === "getmonthlyschedule")
        {
            // 年休総数-月ごとの取得予定累計
            ret = this.getMonthlySchedule(index);
        }
        else if(item === "getmonthlyexecute")
        {
            // 年休総数-(月ごとの計画休数累計+月ごとの突発休数累計
            ret = this.getMonthlyExecute(index);
        }
        
        return ret;
    }

    // 個人情報データ設定API
    public SetPersonalData(item: string, value: any): void
    {
        // lodalStorageデータ取得
        this.loadPersonalData();

        if(item === "name")
        {
            // 名称
            this.Name = String(value);
        }
        else if(item === "totalholiday")
        {
            // 年休総数
            this.TotalHoliday = Number(value);
        }

        // lodalStorageデータ保存
        this.savePersonalData();
    }

    // 有給休暇データ設定API
    public SetHolidayData(month: string, item: string, value: any): void
    {
        // lodalStorageデータ取得
        this.loadHolidayData();

        // 月から配列の番号を取得
        let index = this.Position[month];
        
        if(item === "targetholiday")
        {
            // 年末目標残数
            this.TargetHoliday = Number(value);
        }
        else if(item === "schedule")
        {
            // 取得予定
            this.Schedule[index] = Number(value);
        }
        else if(item === "plan")
        {
            // 計画休数
            this.Plan[index] = Number(value);
        }
        else if(item === "sudden")
        {
            // 突発休数
            this.Sudden[index] = Number(value);
        }
        else if(item === "comment")
        {
            // 振り返り
            this.Comment = String(value);
        }

        // lodalStorageデータ保存
        this.saveHolidayData();
    }
}
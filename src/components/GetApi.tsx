import { JsonFileManager } from './JsonFileManager';

// 個人情報項目リスト
const personalItems = [
    "name", // 名称
    "totalholiday", // 年休総数
];

// データ取得
function GetApi(item: string, month: string = "dummy"): any 
{
    let ret: any;
    let fileManager = JsonFileManager.getInstance();

    if(personalItems.indexOf(item) >= 0)
    {
        // 個人情報データ取得
        ret = fileManager.GetPersonalData(item);
    }
    else
    {
        // 有給休暇データ取得
        ret = fileManager.GetHolidayData(item, month);
    }

    return ret;
}

export default GetApi;
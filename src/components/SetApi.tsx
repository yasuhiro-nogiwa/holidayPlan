import { JsonFileManager } from './JsonFileManager';

// 個人情報項目リスト
const personalItems = [
    "name", // 名称
    "totalholiday", // 年休総数
];

// データ設定
function SetApi(item: string, month: string, value: any): boolean 
{
    let ret: boolean = false;
    let fileManager = JsonFileManager.getInstance();

    if(personalItems.indexOf(item) >= 0)
    {
        // 個人情報データ設定
        ret = fileManager.SetPersonalData(item, value);
    }
    else
    {
        // 有給休暇データ設定
        ret = fileManager.SetHolidayData(month, item, value);
    }

    return ret;
}

export default SetApi;

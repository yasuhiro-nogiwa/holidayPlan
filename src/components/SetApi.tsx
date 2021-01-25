import { JsonFileManager } from './JsonFileManager';

// データ設定
function SetApi(item: string, month: string, value: any): void 
{
    let fileManager = JsonFileManager.getInstance();

    if(item === "name" || item === "totalholiday")
    {
        // 個人情報データ設定
        fileManager.SetPersonalData(item, value);
    }
    else
    {
        // 有給休暇データ設定
        fileManager.SetHolidayData(month, item, value);
    }
}

export default SetApi;

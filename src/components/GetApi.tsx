import { JsonFileManager } from './JsonFileManager';

// データ取得
function GetApi(item: string, month: string = "dummy"): any 
{
    let ret: any;
    let fileManager = JsonFileManager.getInstance();

    if(item === "name" || item === "totalholiday")
    {
        ret = fileManager.GetPersonalData(item);
    }
    else
    {
        ret = fileManager.GetHolidayData(item, month);
    }

    return ret;
}

export default GetApi;


import { JsonFileManager } from './JsonFileManager';

// データ取得
function GetApi(item: string, month: string = "dummy"): any 
{
    let ret: any;
    let fileManager = JsonFileManager.getInstance();

    if(item === "name" || item === "totalHoriday")
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

console.log(GetApi("name"));
console.log(GetApi("comment"));

console.log(GetApi("schedule", "aplil"));
console.log(GetApi("schedule", "december"));
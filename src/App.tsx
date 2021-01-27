import React, { useState } from 'react';

import Settings from './components/Settings';
import Table from './components/Table';
import Chart from './components/Chart';
import PieChart from './components/PieChart';
import TextBox from './components/TextBox';

import GetApi from './components/GetApi';
import './App.css'

const monthArray: string[] = [
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "january",
  "february",
  "march",
];

function App() {

  /** チャート関連Hooks */
  const [schedule, setSchedule] = useState(getGraphData("getmonthlyschedule"));
  const [execute, setExecute] = useState(getGraphData("getmonthlyexecute"));
  const [holiday, setHoliday] = useState(getGraphData("monthlyholiday"));
  const [maximum, setMaximum] = useState(maxYaxis());
  const [plNum, setPlNum] = useState(GetApi("totalplan", "dummy"));
  const [suNum, setSuNum] = useState(GetApi("totalsudden", "dummy"));

  /** チャート関連データの更新メソッド props格納 */
  const changeApi = () => {
    setSchedule(getGraphData("getmonthlyschedule"));
    setExecute(getGraphData("getmonthlyexecute"));
    setHoliday(getGraphData("monthlyholiday"));
    setMaximum(maxYaxis());
    setPlNum(GetApi("totalplan", "dummy"));
    setSuNum(GetApi("totalsudden", "dummy"));
  }

  return (
    <div className="App">
      {/* ボタン用に50px開けておく */}
      <div style={{ marginTop: '50px', marginLeft: 30, }}>
        <Settings changeApi={changeApi} />
        <Table changeApi={changeApi} />
      </div>
      {/* divで領域を調整し、左右にグラフを表示する*/}
      <div>
        <div className="chartBar" style={{ marginTop: 10, marginLeft: 30, position: "relative", width: 700, height: 300 }} >
          <Chart schedule={schedule} execute={execute} holiday={holiday} maximum={maximum} />
        </div>
        <div className="pieChart" style={{ marginLeft: 30, position: "relative", width: 200, height: 250 }} >
          <PieChart plan={plNum} sudden={suNum} />
        </div>
      </div>
      <div className="text" style={{ marginTop: '20px', marginLeft: 30 }}>
        <label className="label">振り返り</label>
      </div>
      <div className="ui form" style={{ marginTop: '10px', marginLeft: 30 }}>
        <TextBox />
      </div>
    </div>
  );

  /** 複合グラフY軸最大値を求めるメソッド  */
  function maxYaxis() {
    //年始総数+5 or 棒グラフの最大+5 or 15(最小値)
    let totalVal = GetApi("totalholiday", "dummy");
    let barValue = getGraphData("monthlyholiday").pop();
    if (!barValue) {barValue = 0};
    let value = totalVal > barValue ? totalVal + 5 : barValue + 5;
    if (value > 15 ) {
      return value;
    } else {
      return 15;
    }
  }

  /** 各月のグラフデータ配列の生成関数 */
  function getGraphData(typeKey: string) {
    let retData: Array<number> = [];
    monthArray.forEach(key => {
      let val = GetApi(typeKey, key)
      if (!val || val < 0) {
        val = 0;
      }
      retData.push(val);
    })
    return retData;
  }
  
}

export default App;

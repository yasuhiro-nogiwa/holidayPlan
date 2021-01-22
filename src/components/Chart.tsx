import React from 'react';
import { Bar } from 'react-chartjs-2';
// import { JsonFileManager } from './JsonFileManager';
// import GetApi from './GetApi';

const Chart = () => {

  // let f = JsonFileManager.getInstance();

  const monthArray = [
    "aplil",
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
  ]

  const labelData = [
    ['4月'], ['5月'], ['6月'], ['7月'],
    ['8月'], ['9月'], ['10月'], ['11月'],
    ['12月'], ['1月'], ['2月'], ['3月'],
  ]

  // function getGraphData( typeKey: string) {
  //   var retData: Array<number> = new Array(12);
  //   for (const key in monthArray) {
  //     retData.push = GetApi(typeKey, key);
  //   }
  //   return retData;
  // }

  //予定線データ
  let planDataF = function () {
    // var retData: Array<number> = new Array(12);
    // for (const key in monthArray) {
    //   retData.push = f.GetHolidayData("getmonthlyschedule", key);
    // }
    // return retData;
    // return getGraphData("getmonthlyschedule");
    return [24, 22, 21, 20, 19.5, 18.5, 16.5, 15.5, 9.5, 7.5, 6.5, 5.5];
  }
  //実行線データ
  let executionDataF = function () {
    // return getGraphData("getmonthlyexecute");
    return [23.5, 23.5, 20.5, 20.5, 19.5, 17.5, 16.5, 14.5, 14.5, 8, 7, 6];
  }
  //総数棒グラフデータ
  let totalBarDataF = function () {
    // return getGraphData("monthlyholiday");
    return [1.5, 1.5, 4.5, 4.5, 5.5, 7.5, 8.5, 10.5, 10.5, 17, 18, 19];
  }

  /** グラフデータ */
  const graphData = {
    labels: labelData,
    datasets: [
      {
        type: 'line',   //グラフ種類
        yAxisID: 'y-axis-days',
        data: planDataF(),    //データ
        label: '予定',  //凡例のlabel
        lineTension: 0, //線は直線で表示する
        fill: false,    //塗りつぶしなし
        borderColor: 'rgba(188, 188, 0, 1)',    //線の色
        pointRadius: 0, //頂点の丸の表示
      },
      {
        type: 'line',
        yAxisID: 'y-axis-days',
        data: executionDataF(),
        label: '実行',
        lineTension: 0,
        fill: false,
        borderColor: 'rgba(128, 0, 0, 0.5)',
        pointRadius: 0,
      },
      {
        type: 'bar',
        yAxisID: 'y-axis-days',
        data: totalBarDataF(),
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: '消化総数',
      },
      {
        type: 'line',
        yAxisID: 'y-axis-days',
        data: [10, 10, 10, 10, 10, 10, 10, 9, 8, 7, 6, 5],
        label: 'デットゾーン',
        // lineTension: 0,
        pointRadius: 0,
        borderColor: 'rgba(255, 0, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },],
  };

  function maxYaxis(): number {
    return (planDataF()[0] + 5);
  }

  /** グラフオプション */
  const graphOption = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            // labelString: '2019年',
          },
        },
      ],
      yAxes: [
        {
          id: 'y-axis-days',
          position: 'left',
          scaleLabel: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
            max: maxYaxis()
            // callback: maxYaxis,
          },
        },
      ],
    },
  };

  return (
    <div className="Chart">
      {/* グラフコンポーネントの呼び出し */}
      <Bar data={graphData} options={graphOption} />
    </div>
  );
}

export default Chart;
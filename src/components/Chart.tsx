import React from 'react';
import { Bar } from 'react-chartjs-2';

type Prop = {
  schedule: number[]; //予定線
  execute: number[];  //実行線
  holiday: number[];  //休暇総数
  maximum: number;    //Y軸Max値
}

const Chart: React.FC<Prop> = ( props ) => {

  /** ラベルデータ */
  const labelData = [
    ['4月'], ['5月'], ['6月'], ['7月'],
    ['8月'], ['9月'], ['10月'], ['11月'],
    ['12月'], ['1月'], ['2月'], ['3月'],
  ]

  /** グラフデータ */
  const graphData = {
    labels: labelData,
    datasets: [
      {
        type: 'line',   //グラフ種類
        yAxisID: 'y-axis-days',
        data: props.schedule,    //データ
        label: '予定',  //凡例のlabel
        lineTension: 0, //線は直線で表示する
        fill: false,    //塗りつぶしなし
        borderColor: 'rgba(188, 188, 0, 1)',    //線の色
        pointRadius: 0, //頂点の丸の表示
      },
      {
        type: 'line',
        yAxisID: 'y-axis-days',
        data: props.execute,
        label: '実行',
        lineTension: 0,
        fill: false,
        borderColor: 'rgba(128, 0, 0, 0.5)',
        pointRadius: 0,
      },
      {
        type: 'bar',
        yAxisID: 'y-axis-days',
        data: props.holiday,
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: '消化総数',
      },
      {
        type: 'line',
        yAxisID: 'y-axis-days',
        data: [10, 10, 10, 10, 10, 10, 10, 9, 8, 7, 6, 5],
        label: 'デットゾーン',
        pointRadius: 0,
        borderColor: 'rgba(255, 0, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },],
  };

  /** グラフオプション */
  const graphOption = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
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
            max: props.maximum
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
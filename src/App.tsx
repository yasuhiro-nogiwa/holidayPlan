import React from 'react';

import Table from './components/Table';
import Chart from './components/Chart';
import PieChart from './components/PieChart';

//cssを利用するのであればimport
import './App.css'

function App() {
  return (   
    <div className="App">
      {/* ボタン用に50px開けておく */}
      {/* <div style={{marginTop:'50px'}}>App Test</div> */}
      <div style={{ marginTop: '50px', marginLeft: 30, }}>
        <Table />
      </div>
      {/* <div style={{ marginTop: '10px', marginLeft: 30 }}>
        <Table />
      </div> */}
      {/* divで領域を調整し、左右にグラフを表示する*/}
      <div>
        <div className="chartBar" style={{ marginTop: 10, marginLeft: 30, position: "relative", width: 700, height: 300 }} >
          <Chart />
        </div>
        <div className="chartCycle" style={{ marginLeft: 30, position: "relative", width: 200, height: 250 }} >
          <PieChart />
        </div>
      </div>
      <div className="text" style={{ marginTop: '10px', marginLeft: 30 }}>
        <label className="label">振り返り</label>
      </div>
      <div className="text" style={{ marginTop: '10px', marginLeft: 30 }}>
        <textarea style={{ width: 800, height: 50 }}></textarea>
      </div>
    </div>
  );
}

export default App;

import { disconnect } from 'process';
import React from 'react';

import Table from './components/Table';
import Chart from './components/Chart';

function App() {
  return (
    <div className="App">
      {/* ボタン用に50px開けておく */}
      {/* <div style={{marginTop:'50px'}}>App Test</div> */}
      <br />
      <Table />
      <Chart />
    </div>
  );
}

export default App;
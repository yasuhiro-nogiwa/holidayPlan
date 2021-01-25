import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import GetApi from './GetApi';
import SetApi from './SetApi';

const Settings: FunctionComponent = () => {

  const titles = ['氏名', '年休残数', '年末目標残数', '現時点残数'];
  
    const [nameVal, setNameVal] = useState(GetApi("name", "dummy"));
    const [totalVal, setTotalVal] = useState(GetApi("totalhoriday", "dummy"));
    const [lastVal, setsetLastVal] = useState(GetApi("targetholiday", "dummy"));
    const [nowVal, setNowVal] = useState(GetApi("remain", "dummy"));

    const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setNameVal(e.target.value);
      SetApi("name","dummy",e.target.value);
      // console.log(e.target.value);
    }

    const handleInputTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTotalVal(e.target.value);
      SetApi("totalhoriday","dummy",e.target.value);
      // console.log(e.target.value);
    }

    const handleInputLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setsetLastVal(e.target.value);
      SetApi("targetholiday","dummy",e.target.value);
      // console.log(e.target.value);
    }

    const handleInputNowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setNowVal(e.target.value);
      SetApi("remain","dummy",e.target.value);
      // console.log(e.target.value);
    }

    // const handleInputData = (item: string, month: string, e: React.ChangeEvent<HTMLInputElement>) => {

    // }

//    let name =function() {
//         return GetApi("name", "dummy");
//     }

//     let totalHoriday =function() {
//         return GetApi("totalHoriday", "dummy");
//     }

//     let targetHoliday =function() {
//         return GetApi("targetHoliday", "dummy");
//     }

//     let remain =function() {
//         return GetApi("remain", "dummy");
//     }

    return (
        
        <table>
            <tbody>
              <tr>
                <p>氏名</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={nameVal}
                      onChange={handleInputNameChange}/>
                  </td>
              </tr>
              <tr>
                <p>年末残数</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={totalVal}
                      onChange={handleInputTotalChange}/>
                  </td>
              </tr>
              <tr>
                <p>年末目標残数</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={lastVal}
                      onChange={handleInputLastChange}/>
                  </td>
              </tr>
              <tr>
                <p>現時点残数</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={nowVal}
                      onChange={handleInputNowChange}/>
                  </td>
              </tr>
            </tbody>
        </table>
    );
};

export default Settings;
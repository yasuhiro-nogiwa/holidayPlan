import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import GetApi from './GetApi';
import SetApi from './SetApi';

const Settings: FunctionComponent = () => {

  const titles = ['氏名', '年休残数', '年末目標残数', '現時点残数'];

    const [cells, setSells] = useState([
      { name: '0', stock: '1', last: '2', now: '5'},
      ])

    const [nameVal, setTextVal] = useState('');
    const [totalVal, setTextVal1] = useState('');
    const [lastVal, setTextVal2] = useState('');
    const [nowVal, setTextVal3] = useState('');

    const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTextVal(e.target.value);
      console.log(e.target.value);
    }

    const handleInputTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTextVal1(e.target.value);
      console.log(e.target.value);
    }

    const handleInputLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTextVal2(e.target.value);
      console.log(e.target.value);
    }

    const handleInputNowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTextVal3(e.target.value);
      console.log(e.target.value);
    }

   let name =function() {
        return GetApi("name", "dummy");
    }

    let totalHoriday =function() {
        return GetApi("totalHoriday", "dummy");
    }

    let targetHoliday =function() {
        return GetApi("targetHoliday", "dummy");
    }

    let remain =function() {
        return GetApi("remain", "dummy");
    }

    return (
        
        <table>
            <tbody>
              <tr>
                <p>氏名</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={name()}
                      onChange={handleInputNameChange}/>
                  </td>
              </tr>
              <tr>
                <p>年末残数</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={totalHoriday()}
                      onChange={handleInputTotalChange}/>
                  </td>
              </tr>
              <tr>
                <p>年末目標残数</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={targetHoliday()}
                      onChange={handleInputLastChange}/>
                  </td>
              </tr>
              <tr>
                <p>現時点残数</p>
                  <td>
                    <input
                      style={{ width: 100, height: 20 }}
                      value={remain()}
                      onChange={handleInputNowChange}/>
                  </td>
              </tr>
            </tbody>
        </table>
    );
};

export default Settings;
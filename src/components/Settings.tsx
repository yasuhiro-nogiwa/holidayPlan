import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import GetApi from './GetApi';
import SetApi from './SetApi';

interface Props {
  changeApi: VoidFunction;
}

const Settings: FunctionComponent<Props> = (props) => {

  const titles = ['氏名', '年休総数', '年末目標残数', '現時点残数'];

  const cellWidth = 100;
  const cellHeight = 20;
  const textLengthCheck = 300;
  const totalholidaymin = 0;
  const targetholidaymin = 5;
  const targetholidaymax = 35;
  const tablewidth = 250;

  const numcheck = /^[0-9\b]+$/;

  const [nameVal, setNameVal] = useState(GetApi("name", "dummy"));
  const [totalVal, setTotalVal] = useState(GetApi("totalholiday", "dummy"));
  const [lastVal, setLastVal] = useState(GetApi("targetholiday", "dummy"));
  const [nowVal, setNowVal] = useState(GetApi("remain", "dummy"));

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= textLengthCheck) {
      e.preventDefault();
      setNameVal(e.target.value);
      SetApi("name", "dummy", e.target.value);
    }
  }

  const handleInputTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === '' || numcheck.test(e.target.value)) {
      let checkResult: boolean = dayCheck(e.target.value, "totalholiday")

      if (checkResult === true) {
        setTotalVal(e.target.value);
        SetApi("totalholiday", "dummy", e.target.value);
        setNowVal(GetApi("remain", "dummy"));

        //変更関数を呼ぶ
        props.changeApi();
      }
    }
  }

  const handleInputLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === '' || numcheck.test(e.target.value)) {
      let checkResult = dayCheck(e.target.value, "targetholiday");

      setLastVal(e.target.value);

      if (e.target.value === '') {
        checkResult = true;
      }

      if (checkResult === true) {
        SetApi("targetholiday", "dummy", e.target.value);
      }
    }
  }

  function dayCheck(inputTxt: string, label: string): boolean {

    let result: boolean = false;
    let inputNum = Number(inputTxt);

    if (label === 'totalholiday') {
      if (inputNum >= totalholidaymin) {
        result = true;
      }

    } else {

      if (inputNum >= targetholidaymin && inputNum <= targetholidaymax) {
        result = true;
      }
    }
    return result;
  }

  return (

    <table className="ui definition table" style={{ width: tablewidth }}>
      <tbody>
        <tr>
          <td>氏名</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border:"none" }}
              value={nameVal}
              onChange={handleInputNameChange} />
          </td>
        </tr>
        <tr>
          <td>今年度年末総数</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border:"none" }}
              value={totalVal}
              onChange={handleInputTotalChange} />
          </td>
        </tr>
        <tr>
          <td>年末目標残数</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border:"none" }}
              value={lastVal}
              onChange={handleInputLastChange} />
          </td>
        </tr>
        <tr>
          <td>現時点残数</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border:"none" }}
              value={nowVal}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Settings;
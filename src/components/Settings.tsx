import React, { useState } from 'react'
import GetApi from './GetApi';
import SetApi from './SetApi';

interface Props {
  changeApi: VoidFunction;
  nowNum: number;
}

const Settings: React.FC<Props> = (props) => {

  const cellWidth = 100;
  const cellHeight = 20;
  const tablewidth = 250;

  const numcheck = /^[0-9\b\.]+$/;

  const [nameVal, setNameVal] = useState(GetApi("name", "dummy"));
  const [totalVal, setTotalVal] = useState(GetApi("totalholiday", "dummy"));
  const [lastVal, setLastVal] = useState(GetApi("targetholiday", "dummy"));

  // 氏名の判定
  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 300) {
      e.preventDefault();
      setNameVal(e.target.value);
      SetApi("name", "dummy", e.target.value);
    }
  }

  // 今年度年末総数の判定
  const handleInputTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === '' || numcheck.test(e.target.value)) {
      let checkResult: boolean = dayCheck(e.target.value, "totalholiday")

      if (checkResult === true) {
        setTotalVal(e.target.value);
        SetApi("totalholiday", "dummy", e.target.value);

        //変更関数を呼ぶ
        props.changeApi();
      }
    }
  }

  // 年末目標残数の判定
  const handleInputLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value === '' || numcheck.test(e.target.value)) {
      let checkResult = dayCheck(e.target.value, "targetholiday");

      var txtArrray = e.target.value.split(".");
      if (!txtArrray[1] || txtArrray[1] === '0' || txtArrray[1] === '5') {
        setLastVal(e.target.value);
      }

      if (e.target.value === '') {
        checkResult = false;
      }

      if (checkResult === true) {
        SetApi("targetholiday", "dummy", e.target.value);
      }
    }
  }

  // 入力された数値が期待範囲内か判別
  function dayCheck(inputTxt: string, label: string): boolean {

    let result: boolean = false;
    let inputNum = Number(inputTxt);

    // 入力時の小数が5か判別
    var txtArrray = inputTxt.split(".");
    if (!txtArrray[1]) {

      if (label === 'totalholiday') {
        if (inputNum >= 0 && inputNum <= 40) {
          result = true;
        }

      } else {

        if (inputNum >= 5 && inputNum <= 35) {
          result = true;
        }
      }
    } else {
      if (txtArrray[1] === '0' || txtArrray[1] === '5') {
        if (label === 'totalholiday') {
          if (inputNum >= 0 && inputNum <= 40) {
            result = true;
          }

        } else {

          if (inputNum >= 5 && inputNum <= 35) {
            result = true;
          }
        }
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
              style={{ width: cellWidth, height: cellHeight, border: "none" }}
              value={nameVal}
              onChange={handleInputNameChange} />
          </td>
        </tr>
        <tr>
          <td>今年度総数</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border: "none" }}
              value={totalVal}
              onChange={handleInputTotalChange} />
          </td>
        </tr>
        <tr>
          <td>年末目標残数</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border: "none" }}
              value={lastVal}
              onChange={handleInputLastChange} />
          </td>
        </tr>
        <tr>
          <td>現時点残数</td>
          <td>
            <input
              style={{ width: cellWidth, height: cellHeight, border: "none" }}
              value={props.nowNum}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Settings;
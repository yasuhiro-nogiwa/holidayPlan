import React, { useState } from 'react'
import GetApi from './GetApi';
import SetApi from './SetApi';

interface Props {
  changeApi: VoidFunction;
}

const Table: React.FC<Props> = (props) => {

  const titles = ['取得予定', '計画休数', '突発休数'];
  const titlesID = ['schedule', 'plan', 'sudden'];

  const cellWidth = 45;
  const cellHeight = 20;

  const numcheck = /^[0-9\b\.]+$/;

  const [cells, setCells] = useState([
    {
      april: GetApi("schedule", "april"), may: GetApi("schedule", "may"), june: GetApi("schedule", "june"),
      july: GetApi("schedule", "july"), august: GetApi("schedule", "august"), september: GetApi("schedule", "september"),
      october: GetApi("schedule", "october"), november: GetApi("schedule", "november"), december: GetApi("schedule", "december"),
      january: GetApi("schedule", "january"), february: GetApi("schedule", "february"), march: GetApi("schedule", "march")
    },
    {
      april: GetApi("plan", "april"), may: GetApi("plan", "may"), june: GetApi("plan", "june"),
      july: GetApi("plan", "july"), august: GetApi("plan", "august"), september: GetApi("plan", "september"),
      october: GetApi("plan", "october"), november: GetApi("plan", "november"), december: GetApi("plan", "december"),
      january: GetApi("plan", "january"), february: GetApi("plan", "february"), march: GetApi("plan", "march")
    },
    {
      april: GetApi("sudden", "april"), may: GetApi("sudden", "may"), june: GetApi("sudden", "june"),
      july: GetApi("sudden", "july"), august: GetApi("sudden", "august"), september: GetApi("sudden", "september"),
      october: GetApi("sudden", "october"), november: GetApi("sudden", "november"), december: GetApi("sudden", "december"),
      january: GetApi("sudden", "january"), february: GetApi("sudden", "february"), march: GetApi("sudden", "march")
    },
  ])

  // 入力時の処理
  const onChangeCell = (index: number, key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === '' || numcheck.test(event.target.value)) {
      let checkResult = dayCheck(event.target.value);

      if (checkResult === true) {
        const _cells = [...cells];
        _cells[index] = { ..._cells[index], [key]: event.target.value };
        setCells(_cells);

        SetApi(titlesID[index], key, event.target.value);

        props.changeApi();
      }
    }
  }

  // 入力された数値が期待範囲内か判別
  function dayCheck(inputTxt: string): boolean {

    let result: boolean = false;
    let inputNum = Number(inputTxt);

    // 入力時の小数が5か判別
    var txtArrray = inputTxt.split(".");
    if (!txtArrray[1]) {
      if (inputNum >= 0 && inputNum <= 31) {
        result = true;
      }
    } else {
      if (txtArrray[1] === '0' || txtArrray[1] === '5') {
        if (inputNum >= 0 && inputNum <= 31) {
          result = true;
        }
      }
    }
    return result;
  }

  return (

    <table className="ui celled table" style={{ textAlign: "center", width: 1000 }}>
      <thead>
        <tr><th>{''}</th>
          <th>{'4月'}</th>
          <th>{'5月'}</th>
          <th>{'6月'}</th>
          <th>{'7月'}</th>
          <th>{'8月'}</th>
          <th>{'9月'}</th>
          <th>{'10月'}</th>
          <th>{'11月'}</th>
          <th>{'12月'}</th>
          <th>{'1月'}</th>
          <th>{'2月'}</th>
          <th>{'3月'}</th>
        </tr></thead>
      <tbody>
        {cells.map((cell, i) => (
          <tr key={i}>
            <td>{titles[i]}</td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'april')}
                value={cell.april} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'may')}
                value={cell.may} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'june')}
                value={cell.june} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'july')}
                value={cell.july} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'august')}
                value={cell.august} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'september')}
                value={cell.september} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'october')}
                value={cell.october} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'november')}
                value={cell.november} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'december')}
                value={cell.december} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'january')}
                value={cell.january} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'february')}
                value={cell.february} />
            </td>
            <td>
              <input
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  border: "none",
                  textAlign: "center"
                }}
                onChange={onChangeCell(i, 'march')}
                value={cell.march} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
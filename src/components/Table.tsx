import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import GetApi from './GetApi';
import SetApi from './SetApi';

const App: FunctionComponent = () => {

//   getapi
// jsonから値をとってくる

// setapi
// jsonに値をセット

  const titles = ['取得予定', '計画休数', '突発休数'];
  const titlesID = ['schedule', 'plan', 'sudden'];

  const [cells, setCells] = useState([
    { april: GetApi("schedule", "april"), may: GetApi("schedule", "may"), june: GetApi("schedule", "june"), 
    july: GetApi("schedule", "july"), august: GetApi("schedule", "august"), september: GetApi("schedule", "september"),
    october: GetApi("schedule", "october"), november: GetApi("schedule", "november"), december: GetApi("schedule", "december"),
    january: GetApi("schedule", "january"), february: GetApi("schedule", "february"), march: GetApi("schedule", "march") },
    { april: GetApi("plan", "april"), may: GetApi("plan", "may"), june: GetApi("plan", "june"), 
    july: GetApi("schedule", "july"), august: GetApi("schedule", "august"), september: GetApi("schedule", "september"),
    october: GetApi("plan", "october"), november: GetApi("plan", "november"), december: GetApi("plan", "december"),
    january: GetApi("plan", "january"), february: GetApi("plan", "february"), march: GetApi("plan", "march") },
    { april: GetApi("sudden", "april"), may: GetApi("sudden", "may"), june: GetApi("sudden", "june"), 
    july: GetApi("schedule", "july"), august: GetApi("schedule", "august"), september: GetApi("schedule", "september"),
    october: GetApi("sudden", "october"), november: GetApi("sudden", "november"), december: GetApi("sudden", "december"),
    january: GetApi("sudden", "january"), february: GetApi("sudden", "february"), march: GetApi("sudden", "march") },
  ])

  // 入力時の処理
  // 入力を行うとcells配列の中身が受け取れる
  // ただし入力した際の1つ前の結果が得られる
  const onChangeCell = (index: number, key: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const _cells = [...cells]
    _cells[index] = { ..._cells[index], [key]: event.target.value }
    setCells(_cells)

    // 一つ前の情報が表で渡ってくる
    // console.log(cells)

    // 最新の情報が渡ってくるが1つの値でしか渡ってこない
    // 表ではない
    // console.log(event.target.value)

    // 行の情報が入っている(0スタート)
    // console.log(index)
    // console.log(titles[index])
    // console.log(titlesID[index])
  
    // 列(月)の情報が入っている(aprilスタート)
    // console.log(key)

    // 入力した値
    // console.log(event.target.value)

    SetApi(titlesID[index], key, event.target.value)

    // console.log(SetApi(titlesID[index], key, event.target.value))
    console.log(GetApi("schedule", "may"))

    // {index === 0 ? SetApi(titlesID[index], key, 11) 
    //   : index === 1 ? SetApi("schedule", key, 11) 
    //   : SetApi("schedule", key, 11) 
    // }
  }

  return (
    
    <table>
      <thead>
        <tr>
          <td>{''}</td>
          <td>{'4月'}</td>
          <td>{'5月'}</td>
          <td>{'6月'}</td>
          <td>{'7月'}</td>
          <td>{'8月'}</td>
          <td>{'9月'}</td>
          <td>{'10月'}</td>
          <td>{'11月'}</td>
          <td>{'12月'}</td>
          <td>{'1月'}</td>
          <td>{'2月'}</td>
          <td>{'3月'}</td>
        </tr>
      </thead>
      <tbody>
        {cells.map((cell, i) => (
          <tr key={i}>

            <p>{titles[i]}</p>
            
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'april')} value={cell.april} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'may')} value={cell.may} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'june')} value={cell.june} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'july')} value={cell.july} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'august')} value={cell.august} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }}onChange={onChangeCell(i, 'september')} value={cell.september} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'october')} value={cell.october} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'november')} value={cell.november} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'december')} value={cell.december} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'january')} value={cell.january} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'february')} value={cell.february} />
            </td>
            <td>
              <input style={{ width: 45, height: 20 }} onChange={onChangeCell(i, 'march')} value={cell.march} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
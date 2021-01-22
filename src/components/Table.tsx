import React, { ChangeEvent, FunctionComponent, useState } from 'react'

const App: FunctionComponent = () => {

  const titles = ['取得予定', '計画休数', '突発休数'];

  const [cells, setCells] = useState([
    { April: '1', May: '1', June: '1', July: '1', August: '1', September: '1', October: '1',
  November: '1', December: '1', January: '1', February: '1', March: '1' },
    { April: '1', May: '1', June: '1', July: '1', August: '1', September: '1', October: '1',
    November: '1', December: '1', January: '1', February: '1', March: '1' },
    { April: '1', May: '1', June: '1', July: '1', August: '1', September: '1', October: '1',
    November: '1', December: '1', January: '1', February: '1', March: '1' },
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

    console.log(cells)
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
              <input onChange={onChangeCell(i, 'April')} value={cell.April} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'May')} value={cell.May} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'June')} value={cell.June} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'July')} value={cell.July} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'August')} value={cell.August} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'September')} value={cell.September} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'October')} value={cell.October} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'November')} value={cell.November} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'December')} value={cell.December} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'January')} value={cell.January} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'February')} value={cell.February} />
            </td>
            <td>
              <input onChange={onChangeCell(i, 'March')} value={cell.March} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
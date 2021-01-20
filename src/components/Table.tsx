import React from 'react'

const Table = () => {
  return (
    <div>
      <table className="book">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr><td>氏名</td><td>野﨑</td></tr>
          <tr><td>有給残数</td><td>35</td></tr>
          <tr><td>目標残数</td><td>14</td></tr>
          <tr><td>現時点</td><td>25</td></tr>
        </tbody>
      </table>
      <br />
      <table className="input" style={{border:"1"}}>
        <thead>
          <tr><th></th>
          <th>4月</th>
          <th>5月</th>
          <th>6月</th>
          <th>7月</th>
          <th>8月</th>
          <th>9月</th>
          <th>10月</th>
          <th>11月</th>
          <th>12月</th>
          <th>1月</th>
          <th>2月</th>          
          <th>3月</th>          
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td><td>2</td><td>3</td><td>4</td>
            <td>1</td><td>2</td><td>3</td><td>4</td>
            <td>1</td><td>2</td><td>3</td><td>4</td>
          </tr>
          <tr>
            <td>1</td><td>2</td><td>3</td><td>4</td>
            <td>1</td><td>2</td><td>3</td><td>4</td>
            <td>1</td><td>2</td><td>3</td><td>4</td>
          </tr>
          <tr>
            <td>1</td><td>2</td><td>3</td><td>4</td>
            <td>1</td><td>2</td><td>3</td><td>4</td>
            <td>1</td><td>2</td><td>3</td><td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
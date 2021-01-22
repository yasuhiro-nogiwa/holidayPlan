import React, { useState } from 'react';

import SetApi from './SetApi';
import GetApi from './GetApi';

const TextBox = () => {

    let comment = GetApi("comment", "dummy");

    const [textVal, setTextVal] = useState(comment);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //全体再描画の抑制
        e.preventDefault();
        //値の確保
        setTextVal(e.target.value);

        //コメント編集の値をセット(随時更新)
        SetApi("comment","dummy",e.target.value);
    }

    return (
        <textarea
            style={{ width: 800, height: 50 }}
            value={textVal}
            onChange={handleInputChange} />
    );
};

export default TextBox;

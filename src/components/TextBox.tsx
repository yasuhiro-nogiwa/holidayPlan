import React, { useState } from 'react';

import SetApi from './SetApi';
import GetApi from './GetApi';

const TextBox = () => {

    const [textVal, setTextVal] = useState(GetApi("comment", "dummy"));

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 300) {
            //全体再描画の抑制
            e.preventDefault();
            //値の確保
            setTextVal(e.target.value);
            //コメント編集の値をセット(随時更新)
            SetApi("comment","dummy",e.target.value);
        }
    }

    return (
        <textarea
            className="text"
            style={{ width: 800 }}
            rows={3}
            value={textVal}
            onChange={handleInputChange} />
    );
};

export default TextBox;

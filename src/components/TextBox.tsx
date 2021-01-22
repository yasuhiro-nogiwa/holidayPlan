import React, { useState } from 'react';

//水上さん、この部分のコメントアウトを取ってください。
// import './SetApi';

const TextBox = () => {

    const [textVal, setTextVal] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextVal(e.target.value);
        console.log(e.target.value);

        //水上さん、この部分のコメントアウトを取ってください。
        // SetApi("comment","dummy",textVal);
    }

    return (
        <textarea
            style={{ width: 800, height: 50 }}
            value={textVal}
            onChange={handleInputChange} />
    );
};

export default TextBox;

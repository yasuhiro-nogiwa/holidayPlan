import React, { useState } from 'react';

const TextBox = () => {

    const [textVal, setTextVal] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextVal(e.target.value);
        console.log(textVal);
    }

    return (
        <textarea
            style={{ width: 800, height: 50 }}
            value={textVal}
            onChange={handleInputChange} />
    );
};

export default TextBox;

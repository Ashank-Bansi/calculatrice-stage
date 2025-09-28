import React, { useState } from "react";
import './Calculator.css';

const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
];

export default function Calculator() {
    const [input, setInput] = useState("");

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput("");
        } else if (value === '=') {
            try {
                setInput(String(eval(input).toString()));
            } catch {
                setInput("Error");
            }
        } else {
            setInput(input + value);
        }
    };

    return (
        <div className="calculator">
            <div className="display">{input || 0}</div>
            <div className="buttons">
                {buttons.map((value, index) => (
                    <button
                        key={index}
                        className={
                            value === 'C' ? "clear" :
                                value === '=' ? "equals" :
                                    ['+', '-', '*', '/'].includes(value) ? "operator" : "number"
                        }
                        onClick={() => handleButtonClick(value)}
                    >
                        {value}
                    </button>
                ))}
            </div>
        </div>
    );
}

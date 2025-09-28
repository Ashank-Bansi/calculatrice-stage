import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import './Calculator.css';

const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', 'CE', '(', ')'
];

export default function Calculator() {
    const [input, setInput] = useState("");
    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput("");
        } else if (value === 'CE') {
            setInput(input.slice(0, -1));
        } else if (value === '=') {
            try {
                setInput(String(evaluate(input)));
            } catch {
                setInput("Error");
            }
        } else {
            setInput(input + value);
        }
    };

    useEffect(() => {
        function handleKeyDown(event) {
            const allowedKeys = '0123456789+-/*=.cC';

            const key = event.key;

            if (allowedKeys.includes(key)) {
                event.preventDefault();

                if (key === 'c' || key === 'C') {
                    setInput("");
                } else if (key === '=') {
                    // Faire comme si le bouton = était cliqué
                    try {
                        setInput(String(evaluate(input)));
                    } catch {
                        setInput("Error");
                    }
                } else {
                    setInput(input + key);
                }
            } else if (key === 'Enter') {
                event.preventDefault();
                try {
                    setInput(String(evaluate(input)));
                } catch {
                    setInput("Error");
                }
            } else if (key === 'Backspace') {
                event.preventDefault();
                setInput(input.slice(0, -1));
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);

    return (
        <div className="calculator">
            <div className="display">{input || 0}</div>
            <div className="buttons">
                {buttons.map((value, index) => (
                    <button
                        key={index}
                        className={
                            value === 'C' ? "clear" :
                            value === 'CE' ? "clear-entry" :
                                value === '=' ? "equals" :
                                    ['+', '-', '*', '/', '(',')'].includes(value) ? "operator" : "number"
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

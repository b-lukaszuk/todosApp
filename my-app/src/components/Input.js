import React from "react";

import "./Input.css";

function Input(props) {
    return (
        <input
            name=""
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e)}
        />
    );
}

export default Input;

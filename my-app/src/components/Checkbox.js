import React from "react";

import "./Checkbox.css";

function Checkbox(props) {
    return (
        <input
            name=""
            type="checkbox"
            checked={props.checked}
            onChange={() => props.onChange()}
        />
    );
}

export default Checkbox;

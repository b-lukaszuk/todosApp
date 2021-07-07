import React from "react";

import Checkbox from "../../components/Checkbox";

function TodoFilter(props) {
    return (
        <div>
            <Checkbox checked={props.checked}
                onChange={() => props.onChange()} />{" "}
            <span>{props.filterMessage} </span>
        </div>
    );
}

export default TodoFilter;

import React from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";

function TodoAdder(props) {
    return (
        <div>
            <Input
                maxLength="18"
                placeholder="add task description..."
                value={props.value}
                onChange={(e) => props.onChangeInput(e)}
                required
            />
      &nbsp;
            <Button
                className="normalBut"
                onClick={() => props.onClickButton(props.value)}
                btnText="Add to the list"
            />
        </div>
    );
}

export default TodoAdder;

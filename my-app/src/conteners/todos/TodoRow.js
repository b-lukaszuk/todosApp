import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";

import "./TodoRow.css";

function trimMessage(msg, noOfChars) {
    let noOfCharsToLeave = noOfChars - 3;
    if (msg.length < noOfCharsToLeave) {
        return msg;
    } else {
        let newMsg = msg.slice(0, noOfCharsToLeave);
        return newMsg + "...";
    }
}

function TodoRow(props) {
    const taskName = props.item.name;
    const isCompleted = props.item.completed;
    const todoId = props.item.id;
    return (
        // wstawia do tbody, wiec produkuje td
        <tr>
            <td className="name">
                <Link to={`/todos/${todoId}`}>
                    <span title="click to see details">&#9432;</span>
                </Link>
        &nbsp;&nbsp;
        {trimMessage(taskName, 20)}
            </td>
            <td className="status">
                <Checkbox
                    checked={isCompleted}
                    onChange={() => props.toggleCompleted(todoId)}
                />
            </td>
            <td>
                <Button
                    className="remBut"
                    onClick={() => props.onClickButton(todoId)}
                    btnText={"\u2716 remove"}
                />
            </td>
        </tr>
    );
}

export default TodoRow;

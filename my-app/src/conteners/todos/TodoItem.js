import React from "react";

import { getKeyFromLocalStorage } from "../../utils/localStorage";
import { useParams } from "react-router-dom";

import "./TodoItem.css";

function TodoItem() {
    const { id } = useParams();

    const todoId = parseInt(id);
    const todos = getKeyFromLocalStorage("todos", []);
    const getTodo = (taskId, todos) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === taskId) {
                return todos[i];
            }
        }
        return null;
    };
    const todo = getTodo(todoId, todos);

    return (
        <div className="container">
            <br /> <br />
            {todo === null ? (
                <div className="centered-div">
                    <p>No task of id: {todoId} found</p>
                </div>
            ) : (
                    <div className="centered-div">
                        <p>
                            <b>ID:</b> {todo.id}
                        </p>
                        <p>
                            <b>Full Name:</b> {todo.name}
                        </p>
                        <p>
                            <b>Completed:</b> {todo.completed ? "Yes" : "No"}
                        </p>
                    </div>
                )}
        </div>
    );
}

export default TodoItem;

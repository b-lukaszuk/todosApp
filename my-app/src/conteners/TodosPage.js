import React, { useEffect, useState, useContext, useReducer } from "react";

import { authContext } from "../components/AuthProvider";
import Button from "../components/Button";
import {
    getKeyFromLocalStorage,
    isKeyInLocalStorage,
    pushDictToLocalStorage,
} from "../utils/localStorage";
import TodoHeader from "./header/TodoHeader";
import TodoList from "./todos/TodoList";

function TodosPage() {

    const { logout } = useContext(authContext);

    const todosInitialState = {
        todos: getKeyFromLocalStorage("todos", []),
    };
    const todosReducer = (state, action) => {
        switch (action.type) {
            case "todosLoad":
                return { ...state, todos: action.payload };
            case "todosAddOne":
                return { ...state, todos: [...state.todos, action.payload] };
            case "todosRemoveOne":
                return {
                    ...state,
                    todos: state.todos.filter((todo) => {
                        return todo.id !== action.todoId;
                    }),
                };
            case "todosRemoveAll":
                return { ...state, todos: [] };
            case "todosToggleCompletedOne":
                return {
                    ...state,
                    todos: state.todos.map((todo) => {
                        if (todo.id === action.todoId) {
                            return { ...todo, completed: !todo.completed };
                        } else {
                            return todo;
                        }
                    }),
                };
            case "todosSortAll":
                return {
                    ...state,
                    todos: action.sortAsc
                        ? state.todos.sort((t1, t2) => t1.name.localeCompare(t2.name))
                        : state.todos.sort((t1, t2) => t2.name.localeCompare(t1.name)),
                };
            default:
                return state;
        }
    };

    const urlForTodos = "https://jsonplaceholder.typicode.com/users/1/todos";
    const [todosState, todosDispatch] = useReducer(
        todosReducer,
        todosInitialState
    );

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(urlForTodos);
            let data = await response.json();
            let modifData = data.map((item) => {
                return {
                    id: item.id,
                    name: item.title,
                    completed: item.completed,
                };
            });
            if (!isKeyInLocalStorage("todos")) {
                console.log("fetching todos from url");
                todosDispatch({ type: "todosLoad", payload: modifData });
            } else {
                console.log("preserving todos from localStorage");
            }
        }
        fetchData();
    }, []);
    // pushes todos to localStorage
    useEffect(() => {
        pushDictToLocalStorage({ todos: todosState.todos });
    }, [todosState]);

    const [taskToAdd, setTaskToAdd] = useState("");

    const [sortAsc, setSortAsc] = useState(true);

    const [showCompleted, setShowCompleted] = useState(
        getKeyFromLocalStorage("showCompleted", true)
    );
    // pushes showCompleted to localStorage
    useEffect(() => {
        pushDictToLocalStorage({ showCompleted: showCompleted });
    }, [showCompleted]);

    const [showPending, setShowPending] = useState(
        getKeyFromLocalStorage("showPending", true)
    );
    // pushes showPending to localStorage
    useEffect(() => {
        pushDictToLocalStorage({ showPending: showPending });
    }, [showPending]);

    /**
     * obsluga checkboxa (checked|unchecked) przy "Show Completed"
     */
    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    /**
     * obsluga checkboxa (checked|unchecked) przy "Show Pending"
     */
    const toggleShowPending = () => {
        setShowPending(!showPending);
    };

    /**
     * sortuje taski alfabetycznie po task name
     * sortuje na przemian raz rosnaco, raz malejaco
     * zmienia todos - [{id: 123, name: "costam", completed: true|false}, ...]
     * zmienia sortAsc
     */
    const sortTasks = () => {
        todosDispatch({ type: "todosSortAll", sortAsc: sortAsc });
        setSortAsc(!sortAsc);
    };

    /**
     * zmienia stan (completed) danego taska
     * @param {number} taskId - idTaska
     * zmienia todos - [{id: 123, name: "costam", completed: true|false}, ...]
     * togglujac status completed dla danego obiektu
     */
    const toggleCompleted = (taskId) => {
        todosDispatch({ type: "todosToggleCompletedOne", todoId: taskId });
    };

    /**
     * updateuje pole input z nazwa taska (do dodania) wpisana przez uzytkownika
     * @param {event} e - event triggerowany przez zmiane pola input
     */
    const updateTaskToAdd = (e) => {
        setTaskToAdd(e.target.value);
    };

    /**
     * zwraca pierwsze wolne id todosa, max+1
     * @param {Object[]} todos - todosy z ktorych beda brane id do analizy
     */
    const getFirstFreeId = (todos) => {
        let usedIds = todos.map((todo) => {
            return todo.id;
        });
        let maxId = usedIds.length === 0 ? 0 : Math.max(...usedIds);
        return maxId + 1;
    };

    /**
     * dodaje taska z pola input do todos
     * [{id: 123, name: "costam", completed: true|false}, ...]
     * @param {string} newTaskDesc - nowe name do dodania
     * przydziela dodanemu taskowi domyslny status completed: false
     * przydziela dodanemu taskowi unikalne id
     */
    const addTaskToList = (newTaskDesc) => {
        if (newTaskDesc.trim() === "") {
            // no empty fields allowed to add
            alert("please provide task description");
        } else if (!newTaskDesc.trim().match(/[a-zA-Z]+/)) {
            alert("Task title must contain at least 1 alphabetic character");
        } else {
            let newId = getFirstFreeId(todosState.todos);
            todosDispatch({
                type: "todosAddOne",
                payload: { id: newId, name: newTaskDesc.trim(), completed: false },
            });
        }
        setTaskToAdd("");
    };

    /**
     * usuwa dany task z listy todos-ow
     * @param {number} idToRemove - id taska do usuniecia
     * (id sa unikalne w obrebie todos)
     * zmienia todosState.todos
     */
    const remTaskFromList = (idToRemove) => {
        todosDispatch({ type: "todosRemoveOne", todoId: idToRemove });
    };

    /**
     * usuwa wszystkie taski z listy todos
     */
    const remAllTasks = () => {
        todosDispatch({ type: "todosRemoveAll" });
    };

    return (
        <div>
            <span>Welcome to our TODO app! </span>
            <Button
                className="normalBut"
                btnText="logout"
                onClick={() => {
                    logout();
                }}
            />
            <TodoHeader
                adderTaskToAdd={taskToAdd}
                adderUpdateTaskToAdd={updateTaskToAdd}
                adderAddTaskToList={addTaskToList}
                remAllBtnRemAllTasks={remAllTasks}
                sorterSortTasks={sortTasks}
                sorterSortOrder={sortAsc ? "A to Z" : "Z to A"}
                filter1Msg="Show Completed"
                filter1Checked={showCompleted}
                filter1OnChange={toggleShowCompleted}
                filter2Msg="Show Pending"
                filter2Checked={showPending}
                filter2OnChange={toggleShowPending}
            />
            {showCompleted && (
                <TodoList
                    listName="Completed tasks:"
                    todos={todosState.todos.filter((t) => {
                        return t.completed;
                    })}
                    toggleCompleted={toggleCompleted}
                    onClickButton={remTaskFromList}
                />
            )}
            <br />
            {showPending && (
                <TodoList
                    listName="Pending tasks:"
                    todos={todosState.todos.filter((t) => {
                        return !t.completed;
                    })}
                    toggleCompleted={toggleCompleted}
                    onClickButton={remTaskFromList}
                />
            )}
        </div>
    );
}

export default TodosPage;

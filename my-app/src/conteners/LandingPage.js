import React, { useState, useContext } from "react";

import { authContext } from "../components/AuthProvider";
import Button from "../components/Button";

import "./LandingPage.css";

function LandingPage(props) {
    const [userName, setUserName] = useState("");
    const [userPassowrd, setUserPassword] = useState("");

    let { login } = useContext(authContext);

    const handleLogin = () => {
        if (userName.trim() !== "" && userPassowrd === "1234") {
            login();
        } else {
            alert("Incorrect user name or password");
        }
    };

    return (
        <div>
            <div className="container">
                <div className="centered-div">
                    <h2>Enter Your data below and go to Your TODOS</h2>
                    <fieldset>
                        <legend>Your name</legend>
                        <input
                            maxLength="18"
                            placeholder="Enter Your Name"
                            type="text"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Your Password</legend>
                        <input
                            maxLength="18"
                            placeholder="Enter Your password"
                            type="password"
                            required
                            value={userPassowrd}
                            onChange={(e) => {
                                setUserPassword(e.target.value);
                            }}
                        />
                    </fieldset>
                    <br />
                </div>
            </div>
            <div className="container">
                <Button className="normalBut" onClick={handleLogin} btnText="Log In" />
            </div>
            <div class="centered-div">
                <p>Please be informed that:</p>
                <ul>
                    <li>
                        once You are logged-in the page may dowload mock todos from{" "}
                        <a href="https://jsonplaceholder.typicode.com/users/1/todos">
                            This web page
                        </a>
                    </li>
                    <li>
                        once You are logged-in the page may read todos from{" "}
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage/">
                            localStorage
                        </a>
                    </li>
                    <li>
                        once You are logged-in the page will store the todos in{" "}
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage/">
                            localStorage
                        </a>
                    </li>
                </ul>
                <p>
                    If You don't want any of this to happen then don't log in and leave the page
                </p>
            </div>
        </div>
    );
}

export default LandingPage;

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
                <Button className="normalBut"
                    onClick={handleLogin} btnText="Log In" />
            </div>
        </div>
    );
}

export default LandingPage;

import * as React from "react";
import { useHistory } from "react-router-dom";

const authContext = React.createContext();

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const history = useHistory();

    function login() {
        history.replace("/todos");
        setIsAuthenticated(true);
    }

    function logout() {
        history.replace("/");
        setIsAuthenticated(false);
    }

    const value = { isAuthenticated, login, logout };
    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export { AuthProvider, authContext };

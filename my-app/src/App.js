import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import { authContext, AuthProvider } from "./components/AuthProvider";
import LandingPage from "./conteners/LandingPage";
import TodoItem from "./conteners/todos/TodoItem";
import TodosPage from "./conteners/TodosPage";

export const UserContext = React.createContext({});

function App(props) {
    const ProtectedRoute = ({ children }) => {
        const { isAuthenticated } = React.useContext(authContext);
        if (isAuthenticated) {
            return children;
        }
        return <Redirect to={{ pathname: "/login" }} />;
    };

    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route exact path="/login">
                        <LandingPage />
                    </Route>
                    <Route exact path="/todos">
                        <ProtectedRoute>
                            <TodosPage />
                        </ProtectedRoute>
                    </Route>
                    <Route exact path="/todos/:id">
                        <ProtectedRoute>
                            <TodoItem />
                        </ProtectedRoute>
                    </Route>
                    <Route path="*">{() => "404 NOT FOUND"}</Route>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;

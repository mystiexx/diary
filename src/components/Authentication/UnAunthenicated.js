import React from "react";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Login from "../../pages/Login/Login";

const UnAuthenticated = (props) => {
    return (
        <Router>
            <Route exact path="/">
                <Login darkMode={props.darkMode} switch={props.handleSwitch}/>
            </Route>
            <Redirect to="/" />
        </Router>
    );
};

export default UnAuthenticated;

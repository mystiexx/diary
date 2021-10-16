import React from "react";
import { Route,  BrowserRouter as Router } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from '../../pages/Login/Register'

const UnAuthenticated = (props) => {
    return (
        <Router>
            <Route exact path="/">
                <Login darkMode={props.darkMode} switch={props.handleSwitch}/>
            </Route>
            <Route exact path='/sign-up'>
                <Register darkMode={props.darkMode} switch={props.handleSwitch}/>
                </Route>
          
        </Router>
    );
};

export default UnAuthenticated;

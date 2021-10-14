import React from 'react'
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Home from '../../pages/Home/Home'
import Header from '../Header/Header';

const Authenticated = ( props ) => {
    return(
        <Router>
        <Route exact path="/">
            <Header darkMode={props.darkMode}>
            <Home darkMode={props.darkMode} switch={props.handleSwitch}/>
            </Header>
        </Route>
        <Redirect to="/" />
    </Router>
    )
}

export default Authenticated
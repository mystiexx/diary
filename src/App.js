import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import UnAuthenticated from "./components/Authentication/UnAunthenicated";
import Authenticated from "./components/Authentication/Authenicated";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from './base'

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(" ");

    const handleSwitch = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                setUser(user);
            } else {
                setUser(" ");
                localStorage.setItem("id", user.uid);
            }
        })
    }, []);
    return (
        <Layout darkMode={darkMode} handleSwitch={handleSwitch}>
            <Router>
                {user ? (
                    <Authenticated darkMode={darkMode} handleSwitch={handleSwitch}/>
                ) : (
                    <UnAuthenticated darkMode={darkMode} handleSwitch={handleSwitch}/>
                )}
                <Redirect to="/" />
            </Router>
        </Layout>
    );
};

export default App;

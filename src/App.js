import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import UnAuthenticated from "./components/Authentication/UnAunthenicated";
import Authenticated from "./components/Authentication/Authenicated";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./base";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(" ");
    const [checked, setChecked] = useState(false);

    const handleSwitch = () => {
        const check = localStorage.getItem("CHC");
        if (check !== darkMode) {
            localStorage.setItem("CHC", !darkMode);
            setDarkMode(!darkMode);
            setChecked(!darkMode);
        } else {
            localStorage.removeItem("CHC");
        }
    };

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(" ");
            } else {
                setUser(user);
            }
        });

        // localStorage.setItem("CHC", !darkMode);

        const check = localStorage.getItem("CHC");
        if (check === darkMode) {
            setDarkMode(!darkMode);
            setChecked(darkMode);
        } else {
            setDarkMode(darkMode);
            setChecked(darkMode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout darkMode={darkMode} handleSwitch={handleSwitch}>
            <Router>
                {user ? (
                    <Authenticated
                        checked={checked}
                        darkMode={darkMode}
                        handleSwitch={handleSwitch}
                    />
                ) : (
                    <UnAuthenticated darkMode={darkMode} handleSwitch={handleSwitch} />
                )}
                <Redirect to="/" />
            </Router>
        </Layout>
    );
};

export default App;

import React from "react";
import Switch from "../Switch/Switch";
import "./Layout.css";

const Layout = ( props ) => {
    return (
        <main className={props.darkMode ? "dark-mode" : "light-mode"}>
            <Switch handleSwitch={props.handleSwitch} />
            {props.children}
        </main>
    );
};

export default Layout;

import React from "react";
import "./Layout.css";

const Layout = ( props ) => {
    return (
        <main className={props.darkMode ? "dark-mode" : "light-mode"}>
            {props.children}
        </main>
    );
};

export default Layout;

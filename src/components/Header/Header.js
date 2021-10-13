import React from "react";
import "./Header.css";

const Header = (props) => {
    return (
        <div>
            <header>
                <h2>F.Y.E.O</h2>
                <button>Sign out</button>
            </header>
            {props.children}
        </div>
    );
};

export default Header;

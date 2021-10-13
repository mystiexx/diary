import React from "react";
import "./Header.css";
import { getAuth, signOut } from 'firebase/auth'
import app from '../../base'

const Header = (props) => {

    const handleSignOut = () => {
        const auth = getAuth(app)
        signOut(auth)
    }
    return (
        <div>
            <header>
                <h2>F.Y.E.O</h2>
                <button onClick={handleSignOut}>Sign out</button>
            </header>
            {props.children}
        </div>
    );
};

export default Header;

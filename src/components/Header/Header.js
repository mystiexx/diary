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
        <div style={{
            position: 'sticky',
            zIndex:'99'
        }}>
            <header className={props.darkMode ? 'navbar-dark' : 'navbar'}>
                <h2>F.Y.E.O</h2>
                <button onClick={handleSignOut}>Sign out</button>
            </header>
            {props.children}
        </div>
    );
};

export default Header;

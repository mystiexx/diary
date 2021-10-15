import React from "react";
import "./Header.css";
import { getAuth, signOut } from "firebase/auth";
import app from "../../base";
import { BsSun, BsMoonStars } from "react-icons/bs";

const Header = (props) => {
    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth);
    };
    return (
        <div
            style={{
                position: "sticky",
                zIndex: "99",
            }}
        >
            <header className={props.darkMode ? "navbar-dark" : "navbar"}>
                <h2>F.Y.E.O</h2>
                <div style={{ display: 'flex', justifyContent:'center'}}> 
                    <button onClick={handleSignOut}>Sign out</button>

                    <div
                        onClick={props.switch}
                        className={props.darkMode ? "head-box-dark" : "head-box"}
                    >
                        {props.checked ? (
                            <BsSun size={30} className="icon" />
                        ) : (
                            <BsMoonStars size={30} className="icon" />
                        )}
                    </div>
                </div>
            </header>
            {props.children}
        </div>
    );
};

export default Header;

import React, { useState } from "react";
import "./Login.css";
import { GrMail } from "react-icons/gr";
import { RiKey2Fill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = (props) => {
    const [show, setShow] = useState("false");
    return (
        <div className="login">
            <div className={props.darkMode ? "login-box-dark" : "login-box"}>
                <div>
                    <div className="input-field">
                        <GrMail size={30} />
                        <input type="text" placeholder="Your e-mail" />
                    </div>
                    <br />
                    <div className="input-field">
                        <RiKey2Fill size={30} />
                        <input type={show ? "password" : "text"} placeholder="Password" />
                        <button onClick={() => setShow(!show)}>
                            {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                </div>

                <div
                className='btn-field'
                >
                    <label>Sign up</label>
                    <button className="login-btn">Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Login;

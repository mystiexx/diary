import React, { useState } from "react";
import "./Login.css";
import { GrMail } from "react-icons/gr";
import { RiKey2Fill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../base";
import Switch from "../../components/Switch/Switch";
import { useHistory } from "react-router";

const Login = (props) => {
    const [show, setShow] = useState("false");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const clearError = () => {
        setEmail(" ");
        setPassword(" ");
    };

    const handleLogin = () => {
        clearError();
        setLoading(true);
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
            })
            .catch((error) => {
                console.log(error.code);
                setLoading(false);
            });
    };
    return (
        <div className="login">
            <Switch handleSwitch={props.switch} />
            <div className={props.darkMode ? "login-box-dark" : "login-box"}>
                <div>
                    <div className="input-field">
                        <GrMail size={30} />
                        <input
                            type="text"
                            placeholder="Your e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="input-field">
                        <RiKey2Fill size={30} />
                        <input
                            type={show ? "password" : "text"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={() => setShow(!show)}>
                            {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="btn-field">
                    <label>Don't have an account <label onClick={()=> history.push('/sign-up')}>Sign up</label></label>
                    <button className="login-btn" onClick={handleLogin}>
                        {loading ? (
                            <lord-icon
                                src="https://cdn.lordicon.com/kvsszuvz.json"
                                trigger="loop"
                                colors="primary:#ffffff,secondary:#08a88a"
                                style={{ width: "50px", height: "50px" }}
                            />
                        ) : (
                            " Sign in"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

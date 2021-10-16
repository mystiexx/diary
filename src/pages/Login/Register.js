/* eslint-disable default-case */
import React, { useState } from "react";
import "./Login.css";
import { GrMail } from "react-icons/gr";
import { RiKey2Fill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../base";
import Switch from "../../components/Switch/Switch";
import { FaUserTie } from "react-icons/fa";
import { useHistory } from "react-router";
import { collection, addDoc, getFirestore, } from "firebase/firestore";

const Register = (props) => {
    const [show, setShow] = useState("false");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const clearError = () => {
        setEmail(" ");
        setPassword(" ");
    };

    const handleLogin =  () => {
        clearError();
        setLoading(true);
        const auth = getAuth(app);
        const db = getFirestore(app)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                const uid = userCredential.user.uid
             addDoc(collection(db, 'users',  userCredential.user.uid), {
                    uid,
                    email: email,
                    name: name,
                })
                
            })
            .catch((error) => {
                switch ( error.code ) {
                    case "auth/email-already-in-use":
                        case "auth/invalid-email":
                            setEmailError(error.code);
                            break;
                        case "auth/weak-password":
                            setPasswordError(error.message);
                            break;
                }
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
                        <FaUserTie size={30} />
                        <input
                            type="text"
                            placeholder="FullName"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="input-field">
                        <GrMail size={30} />
                        <input
                            type="text"
                            placeholder="Your e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <p style={{ color:'red'}}>{emailError}</p>
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
                    <p> {passwordError}</p>
                </div>

                <div className="btn-field">
                    <label>
                        Already have an account{" "}
                        <label onClick={() => history.push("/")}>Sign in </label>
                    </label>
                    <button className="login-btn" onClick={handleLogin}>
                        {loading ? (
                            <lord-icon
                                src="https://cdn.lordicon.com/kvsszuvz.json"
                                trigger="loop"
                                colors="primary:#ffffff,secondary:#08a88a"
                                style={{ width: "50px", height: "50px" }}
                            />
                        ) : (
                            " Sign up"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;

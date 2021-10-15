import React, { useState, useEffect } from "react";
import "./Home.css";
import app from "../../base";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getFirestore, deleteDoc, doc } from "firebase/firestore";
import Toast from "../../components/UI/Toast";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import { BsSun,BsMoonStars } from 'react-icons/bs'

const Home = (props) => {
    const [entry, setEntry] = useState(" ");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const history = useHistory();
    const entries = props.entries;
    const load = props.fetch;

    const close = () => {
        setShow(false);
    };

    const Delete = async (data) => {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "entries", data));
        load();
    };

    const clearInput = () => {
        setEntry(" ");
    };

    const handleEntry = async () => {
        setLoading(true);
        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;
        await addDoc(collection(db, "entries"), {
            id: user.uid,
            body: entry,
            createdAt: new Date().toISOString(),
        })
            .then(() => {
                setShow(true);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.code);
                setLoading(false);
            });

        clearInput();
        load();
    };

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="Home">
            <div style={{ marginTop: "80px" }}>
                <Toast show={show} close={close}>
                    New Entry Made
                </Toast>
          

                <div onClick={props.switch} className={props.darkMode ? 'switch-box-dark' : 'switch-box'}>
                    {
                        props.checked ?<BsSun size={30} className='icon'/> : <BsMoonStars size={30} className='icon'/>
                    }
                    </div>
                <div className="add-button" onClick={scrollTop}>
                    +
                </div>
                <div className={props.darkMode ? "description-field-dark" : "description-field"}>
                    <textarea
                        type="textarea"
                        rows="7"
                        cols="50"
                        value={entry}
                        placeholder="Describe yourself here..."
                        onChange={(e) => setEntry(e.target.value)}
                    />
                    <button onClick={handleEntry}>
                        {" "}
                        {loading ? (
                            <lord-icon
                                src="https://cdn.lordicon.com/kvsszuvz.json"
                                trigger="loop"
                                colors="primary:#ffffff,secondary:#08a88a"
                                style={{ width: "50px", height: "50px" }}
                            />
                        ) : (
                            "Enter"
                        )}{" "}
                    </button>
                </div>

                {entries.length <= 0 ? (
                    <div>No Entry Yet</div>
                ) : (
                    <div className="container">
                        {entries.map((data, id) => (
                            <div className={props.darkMode ? "card-dark" : "card"} key={data.uid}>
                                <p onClick={() => history.push(`/read/${data.uid}`)}>
                                    {dayjs(data.createdAt).format("dddd D MMM YYYY")}{" "}
                                </p>

                                <div>
                                    <button onClick={() => Delete(data.uid)} className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

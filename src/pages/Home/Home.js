import React, { useState, useEffect } from "react";
import Switch from "../../components/Switch/Switch";
import "./Home.css";
import app from "../../base";
import { getAuth } from "firebase/auth";
import {
    collection,
    addDoc,
    getFirestore,
    getDocs,
    orderBy,
    deleteDoc,
    doc,
} from "firebase/firestore";
import Toast from "../../components/UI/Toast";

const Home = (props) => {
    const [entry, setEntry] = useState(" ");
    const [loading, setLoading] = useState(false);
    const [entries, setEntries] = useState([]);
    const [show, setShow] = useState(false);

    const close = () => {
        setShow(false);
    };

    const getAll = async () => {
        const db = getFirestore(app);
        await getDocs(collection(db, "entries"), orderBy("createdAt", "desc")).then(
            (querySnapshot) => {
                // eslint-disable-next-line array-callback-return
                const documents = querySnapshot.docs.map((doc) => {
                    if (doc.exists) {
                        return { ...doc.data(), uid: doc.id };
                    }
                });
                setEntries(documents);
            }
        );
    };

    const Delete = async (data) => {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "entries", data));
        getAll();
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
                setShow(true)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.code);
                setLoading(false);
            });

        clearInput();
        getAll();
    };

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getAll();
        console.log(entries);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="Home">
            <div style={{ marginTop: "80px" }}>
                <Toast show={show} close={close}>
                    New Entry Made
                </Toast>
                <Switch handleSwitch={props.switch} />

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

                <div className="container">
                    {entries.map((data, id) => (
                        <div className={props.darkMode ? "card-dark" : "card"} key={id}>
                            <h5>{data.body.substring(0, 20)}...</h5>

                            <div>
                                <button onClick={() => Delete(data.uid)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

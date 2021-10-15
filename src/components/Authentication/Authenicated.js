import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Header from "../Header/Header";
import { collection, getFirestore, getDocs, orderBy } from "firebase/firestore";
import app from "../../base";
import Spinner from "../Spinner/Spinner";
import Read from "../../pages/Read/Read";

const Authenticated = (props) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const checked = props.checked

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
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <Router>
                    <Header darkMode={props.darkMode}  switch={props.handleSwitch}  checked={checked}>
                        <Route exact path="/">
                            <Home
                                entries={entries}
                                fetch={getAll}
                                darkMode={props.darkMode}
                                switch={props.handleSwitch}
                                checked={checked}
                            />
                        </Route>

                        <Route exact path="/read/:id">
                            <Read entries={entries} darkMode={props.darkMode} />
                        </Route>
                    </Header>
                </Router>
            )}
        </>
    );
};

export default Authenticated;

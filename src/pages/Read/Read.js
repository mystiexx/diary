import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Read.css";
import { GoHome } from "react-icons/go";
import dayjs from "dayjs";
import { useHistory } from "react-router";

const Read = (props) => {
    const { id } = useParams();
    const entries = props.entries;
    const darkMode = props.darkMode;
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="read">
            <div style={{ marginTop: "80px" }}>
                <div onClick={() => history.push("/")} style={{ marginBottom: "10px" }}>
                    <GoHome size={30} style={{ color: darkMode ? '#fff' : '#000' }} />
                </div>

                {entries
                    .filter((v) => v.uid === id)
                    .map((data) => (
                        <div key={data.uid} className={darkMode ? "card-dark" : "card"}>
                            <p>{dayjs(data.createdAt).format("ddd d MMM YYYY")} </p>

                            <h4> {data.body} </h4>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Read;

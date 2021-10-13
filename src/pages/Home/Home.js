import React from "react";
import Switch from "../../components/Switch/Switch";
import "./Home.css";

const arr = [
    {
        id: 1,
        entry: " my first entry",
    },
    {
        id: 2,
        entry: " my first entry",
    },
    {
        id: 3,
        entry: " my first entry",
    },
    {
        id: 4,
        entry: " my first entry",
    },
    {
        id: 5,
        entry: " my first entry",
    },
];

const Home = (props) => {
    return (
        <div className="Home">
            <Switch handleSwitch={props.switch}/>
            <div className="container">
                {arr.map((data) => (
                    <div className={props.darkMode ? 'card-dark' : 'card'} key={data.id}>
                        <h5>{data.entry}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

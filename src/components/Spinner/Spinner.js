import React from "react";
import './Spinner.css'

const Spinner = () => {
    return (
        <div className="spinner">
            <lord-icon
                src="https://cdn.lordicon.com/kvsszuvz.json"
                trigger="loop"
                colors="primary:#181818,secondary:#08a88a"
                style={{ width: "250px", height: "250px" }}
            />
        </div>
    );
};

export default Spinner
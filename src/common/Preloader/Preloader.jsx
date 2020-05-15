import React from "react";


const Preloader = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only text-primary">Loading...</span>
            </div>
        </div>
    );
}

export default Preloader;
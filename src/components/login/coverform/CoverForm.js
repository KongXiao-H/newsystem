import React from 'react';
import './coverform.css'
const CoverForm = (props) => {
    return (
        <div className="pre-box" style={props.style}>
            <h1>WELCOME</h1>
            <p>JOIN US!</p>
            <div className="img-box">
                <img src={props.purl} alt=""/>
            </div>
        </div>
    );
}

export default CoverForm;

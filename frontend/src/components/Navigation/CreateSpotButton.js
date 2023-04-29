import React from "react";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './Navigation.css';

function CreateSpotButton({ user }) {


    const redirect = () => {
        <Redirect to='Create-Spot' />;
    }
    const handleClick = (e) => {
        e.preventDefault();
        redirect();
    }
    return (
        <div>
            <button id="create-button" onClick={handleClick}>
                Create Spot
            </button>
        </div>
    )
}

export default CreateSpotButton

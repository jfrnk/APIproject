import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div id="nav-links">
                <LoginFormModal />
                <SignupFormModal />
            </div>
        );
    }

    return (
        <div id="nav-link-container">
            <span id='home-list'>
                <NavLink exact to='/'>Home</NavLink>
                {isLoaded && sessionLinks}
            </span>
        </div>
    );
}

export default Navigation;

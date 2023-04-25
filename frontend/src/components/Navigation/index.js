import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import SignupFormModal from "../SignupFormModal";
import logo from '../../assets/Sharebnb-logo-nbg.png';


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
                <NavLink exact to='/'>
                    <img src={logo} className="logo" alt="sharebnb logo"></img>
                </NavLink>
                {isLoaded && sessionLinks}
            </span>
        </div>
    );
}

export default Navigation;

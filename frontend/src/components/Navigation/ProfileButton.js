import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as SessionActions from '../../store/session';
import './Navigation.css';
function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(SessionActions.logout());
    };

    return (
        <div>
            <button id='profile-button' onClick={openMenu}>
                <i id='user-circle' className="fa-regular fa-circle-user"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileButton;

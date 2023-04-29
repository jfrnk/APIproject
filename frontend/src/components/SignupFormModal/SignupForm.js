import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";


function SignupFormPage() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to="/spots" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form id='signup-container' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>


            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>



            <div className="wrap-input100">
                <input className="input100"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>


            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button type="submit" className="login100-form-btn">
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SignupFormPage;

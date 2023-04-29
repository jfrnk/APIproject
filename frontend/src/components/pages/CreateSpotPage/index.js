import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";

import '../../LoginFormModal/LoginModal.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function CreateSpotPage() {
    const dispatch = useDispatch();


    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);

    // console.log(sessionSpot)
    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();

        history.push('/photos');
        return (dispatch(sessionActions.createSpot({ name, address, city, state, country, lat, lng, description, price }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        )

    }


    // console.log(lastSpot);

    return (

        <form id='signup-container' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Name"></span>
            </div>


            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Address"></span>
            </div>



            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="decimal"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="decimal"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input100">
                <input className="input100"
                    type="decimal"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <span className="focus-input100" data-placeholder="Email"></span>
            </div>






            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button type="submit" className="login100-form-btn">
                        Continue
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreateSpotPage;

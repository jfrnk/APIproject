import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../../store/session';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ImagesPage() {
    const dispatch = useDispatch();

    let [url, setUrl] = useState("");
    const [preview] = useState(true);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleImageUpload = (e) => {

        const file = e.target.files[0];
        // console.log(file);

        const imageUrl = URL.createObjectURL(file);
        // console.log(imageUrl);

        url = imageUrl;


        // history.push('/spot-Page');
        return dispatch(sessionActions.createImage({ url, preview }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

    };

    return (
        <div>
            <input
                type="file"
                name="image-upload"
                value=''
                accept="image/*"
                onChange={handleImageUpload}
            />
        </div>
    )

}

export default ImagesPage;

import React, { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import './spots.css'
function SpotView() {

    const [spots, setSpots] = useState([]);
    let isLoaded;
    useEffect(() => {

        getSpots();
    }, [getSpots])

    async function getSpots() {
        const response = await csrfFetch('/api/spots');
        const data = await response.json();
        setSpots(data.spots)
    }
    return (
        // console.log(spots[0].SpotImages[0].url)
        <div id='spot-container'>
            {spots.map((spot) => {
                return <div key={spot.id} id='spot-card' className='spots'>
                    <img id='spot-img' src={spot.SpotImages} alt='spot-preview'></img>
                    <h2>{spot.name}</h2>
                </div>

            })}

        </div>
    )
}
export default SpotView;

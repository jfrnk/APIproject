import React, { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import './spots.css'


function SpotView() {

    const [spots, setSpots] = useState([]);

    useEffect(() => {

        getSpots();
    }, [getSpots])

    async function getSpots() {
        const response = await csrfFetch('/api/spots');
        const data = await response.json();
        setSpots(data.spots)
    }

    // console.log(lastId)
    return (
        // console.log(spots[0].SpotImages[0].url)
        <div id='spot-container'>
            {spots.map((spot) => {
                return <div id='spot-cards'>
                    <div key={spot.id} id='spot-card' className='spots'>
                        <img id='spot-img' key={spot.SpotImages[0].url} src={spot.SpotImages[0].url} alt='spot-preview'></img>
                        <h2 className='spot-text' key={spot.name}>{spot.name}</h2>
                        <h3 key={spot.price}>{spot.price}</h3>
                    </div>
                </div>
            })}

        </div>
    )
}
export default SpotView;

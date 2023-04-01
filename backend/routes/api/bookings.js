const express = require('express');

const {Spot, User, Review, Booking} = require('../../db/models');

const router = express.Router();


router.get('/current', async (req, res) =>{
    const userid = req.user.id;

    const bookings = await Booking.findAll({
        where: {
            userId: userid
        }
    })

    res.json(bookings);
})

router.put('/:id', async(req, res) =>{
    const bookingId = req.params.id;
    const booking = await Booking.findByPk(bookingId);
    const {startDate, endDate} = req.body;
    if(booking.userId === req.user.id){
        booking.startDate = startDate;
        booking.endDate = endDate;
        res.json(booking)
    }else{
        throw new Error('Authentication required')
    }
})

module.exports = router;

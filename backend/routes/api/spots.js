const express = require('express');


const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get('', async (req, res) => {
    const spots = await Spot.findAll({
        include: [{ model: SpotImage }]
    });

    res.status(200);
    return res.json({ spots: spots });
})

// router.use(restoreUser);

router.post('', async (req, res) => {
    const user = User.findByPk(req.user.id);
    const id = req.user.id
    console.log(req.user.id);
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: id });

    return res.json(spot);
})

router.get('/current', async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        include: [{ model: Spot }]
    });
    return res.json(user.Spots);
})

router.get('/:id', async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, {
        include: [{ model: User, as: 'Owner' }, { model: SpotImage }],
        exclude: [User.username]
    })

    return res.json(spot);
})

router.delete('/:id', async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    // if(spot.ownerId === req.user.id){
    await spot.destroy();
    return res.json({ message: "Your spot has been successfully Deleted" })
    // }else{
    throw new Error('Only the owner can Delete a spot')
    // }
})

router.put('/:id', async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.statusCode = 404;
        throw new Error(`Spot at id ${spotId} does not exist`);
    }

    if (!(spot.ownerId == req.user.id)) {
        res.status(400);
        res.json({ message: 'Only the owner can edit a spot' });
    } else {
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng,
            spot.name = name;
        spot.description = description;
        spot.price = price;
        return res.json(spot);
    }
})

router.post('/:id/reviews', async (req, res) => {
    const spotid = req.params.id;
    const userid = req.user.id;
    const spot = Spot.findByPk(spotid);
    const { review, stars } = req.body;

    const newReview = await Review.create({ review, stars, spotId: spotid, userId: userid });

    return res.json(newReview);
})

router.get('/:id/reviews', async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, {
        include: [{ model: Review }, { model: User, as: 'Owner' }]
    })
    res.json(spot)

})

router.post('/:id/bookings', async (req, res) => {
    const spotid = req.params.id;
    const userid = req.user.id
    const { startDate, endDate } = req.body;
    const booking = await Booking.create({ startDate, endDate, spotId: spotid, userId: userid });
    res.json(booking);
})

router.get('/:id/bookings', async (req, res) => {
    const spotid = req.params.id;
    const userid = req.user.id;
    const bookings = await Booking.findByPk(spotid, {
        where: {
            userId: userid
        },
        include: [{ model: Spot }]
    })
    res.json(bookings);
})

router.post('/:id/images', async (req, res) => {
    const spotid = req.params.id;
    const user = req.user.id;
    const spot = await Spot.findByPk(spotid);
    const { url, preview } = req.body;

    console.log(user);
    console.log(spot.ownerId);
    if (user === spot.ownerId) {
        const spotImg = await SpotImage.create({ spotId: spotid, url, preview });
        res.json(spotImg);
    }
    else {
        res.status(400);
        throw new Error('Authentication required')
    }
})
module.exports = router;

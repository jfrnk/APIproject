const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const {Spot, User} = require('../../db/models');
const {restoreUser} = require('../../utils/auth');
const spot = require('../../db/models/spot');
const router = express.Router();

router.get('', async(req, res) =>{
    const spots = await Spot.findAll();

    res.status(200);
    return res.json({spots: spots});
})

// router.use(restoreUser);

router.post('', async (req, res) =>{
    const user = User.findByPk(req.user.id);
    const id = req.user.id
console.log(req.user.id);
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spot = await Spot.create({address, city, state, country, lat, lng, name, description, price, ownerId: id});

    return res.json(spot);
})

router.get('/current', async(req, res) =>{
    const user = await User.findByPk(req.user.id, {
        include: [{model: Spot}]
    });
    return res.json(user.Spots);
})

router.get('/:id', async (req, res) =>{
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, {
        include:[{model: User}]
    })

        return res.json(spot);
})

router.delete('/:id', async (req, res) =>{
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    if(spot.ownerId === req.user.id){
        await spot.destroy();
        return res.json({message: "Your spot has been successfully Deleted"})
    }else{
        throw new Error('Only the owner can Delete a spot')
    }
})

router.put('/:id', async (req, res) =>{
    const userId = req.user.id;
    const spotId = req.params.id;
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spot = await Spot.findByPk(spotId);
    if(!spot){
        res.statusCode = 404;
        throw new Error(`Spot at id ${spotId} does not exist`);
    }

    if(!(spot.ownerId == req.user.id)){
        res.status(400);
        res.json({ message :'Only the owner can edit a spot'} );
    }else{
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
module.exports = router;

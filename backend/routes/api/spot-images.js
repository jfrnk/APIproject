const express = require('express');

const {SpotImage, Spot} = require ('../../db/models');
const router = express.Router();

router.delete('/:id', async (req, res) =>{
    const spotImgId = req.params.id;
    const spotimage = await SpotImage.findByPk(spotImgId);
    const spotid = spotimage.spotId;
    const spot = await Spot.findByPk(spotid);

    if(req.user.id === spot.ownerId){
        await spotimage.destroy();
        return res.json({message: 'Spot Image has been successfully deleted'})
    }else{
        const err =  new Error('Only the owner can delete a spot Image');
        err.status(400);
        return res.json(err);
    }

})
module.exports = router;

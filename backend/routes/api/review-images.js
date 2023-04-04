const express = require('express');

const {ReviewImage, Review} = require('../../db/models');
const router = express.Router();

router.delete('/:id', async (req, res) =>{
    const reviewImgId = req.params.id;
    const reviewimage = await ReviewImage.findByPk(reviewImgId);
    const reviewid = reviewimage.reviewId;
    const review = await Review.findByPk(reviewid);

    if(!reviewimage){
        res.status(404);
        res.json({message: 'No review image found'});
    }

    if(req.user.id === review.userId){
        await reviewimage.destroy();
        return res.json({message: 'Review Image has been successfully deleted'})
    }else{
        throw new Error('Only the user can delete a review image').status(400);
    }
})

module.exports = router;

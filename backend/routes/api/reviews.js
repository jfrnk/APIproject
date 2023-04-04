const express = require('express');

const {Spot, User, Review, ReviewImage} = require('../../db/models');

const router = express.Router();

router.get('/current', async (req, res) =>{
    const id = req.user.id;
    const user = await User.findByPk(id, {

    });
    // const spot = await Spot.findByPk(user.Reviews.spotId)
    // console.log(user.Reviews.id);
    // res.json(user);

    const reviews = await Review.findAll({

        include: [{model: Spot}, {model: ReviewImage}, {model: User}]
})
console.log(reviews.userId);
res.json(reviews)
})

router.put('/:id', async (req, res) =>{
    const id = req.params.id;
    const reviewEdit = await Review.findByPk(id);
    const {review, stars} = req.body;

    if(reviewEdit.userId === req.user.id){
        reviewEdit.review = review;
        reviewEdit.stars = stars;
        res.json(reviewEdit);
    }else{
        throw new Error('Authentication required');
    }
})

router.delete('/:id', async (req, res) =>{
    const id = req.params.id;
    const review = await Review.findByPk(id);
    if(review.userId !== req.user.id){
        res.status(400);
        throw new Error('Authentication required');
    }else {
        await review.destroy();
        res.json({
            message: 'review deleted successfully'
        })
    }
})

router.post('/:id/images', async (req, res) => {
    const reviewid = req.params.id;
    const user = req.user.id;
    const review = await Review.findByPk(reviewid);
    const {url} = req.body;
    // console.log(review.userId);
    if(user === review.userId){
        const reviewImg = await ReviewImage.create({reviewId: reviewid, url});
        res.json(reviewImg);
    }else{
        res.status(400);
        throw new Error('Authentication Required');
    }
})

module.exports = router;

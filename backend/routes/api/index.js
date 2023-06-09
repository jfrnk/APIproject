const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const spotRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const spotImgRouter = require('./spot-images.js');
const reviewImgRouter = require('./review-images.js');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
  });

  router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);
const { requireAuth } = require('../../utils/auth.js');
const booking = require('../../db/models/booking.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingRouter);

router.use('/spot-images', spotImgRouter);

router.use('/review-images', reviewImgRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;














module.exports = router;

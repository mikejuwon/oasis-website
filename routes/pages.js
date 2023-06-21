const { homepage } = require('../controllers/pageController');

const router = require('express').Router();


router.get('/', homepage);


module.exports = router;
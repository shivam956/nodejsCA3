const express = require('express');
const router = express.Router();

const userOptions = require('../controllers/user.js');

router.post("/signin", userOptions.signin);
router.post("/signup", userOptions.signup);

module.exports = router;
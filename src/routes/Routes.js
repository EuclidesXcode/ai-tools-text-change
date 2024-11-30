const express = require('express');
const router = express.Router();
const changeTextController = require('../controllers/changeTextcontroller');

router.post('/change', changeTextController.handleChangeTextRequest);

module.exports = router;
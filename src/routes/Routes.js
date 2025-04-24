const express = require('express');
const router = express.Router();
const changeTextController = require('../controllers/changeTextcontroller');

router.post('/mountPayload', changeTextController.handleChangeTextRequest);

module.exports = router;
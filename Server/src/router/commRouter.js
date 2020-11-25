const express       = require('express');
const Cors          = require('../middleware/cors');
const Controller    = require('../controller/commController');

const router = express.Router();

router.route('/:comm/notify/:user')
    .get(Cors.cors, Controller.notify)

router.ws('/:comm/connect/:user', Controller.connect);

module.exports = router;

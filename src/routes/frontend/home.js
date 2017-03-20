'use strict';
const express = require('express');
const router = express.Router();

const main = require('../../controllers/home');
const getCurrentSysInfo = require('../../../system/getCurrentSysInfo');

router.get('/', main.home);
router.get('/info',getCurrentSysInfo);
module.exports = router;




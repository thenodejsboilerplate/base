'use strict';
const express = require('express');
const router = express.Router();

const main = require('../../controllers/home');

router.get('/', main.home);

module.exports = router;

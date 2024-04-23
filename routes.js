const express = require('express');
const router = express.Router();
const { getUsers } = require('./controllers/user-controllers');

router.route('/users')
.get(getUsers);


module.exports = router;
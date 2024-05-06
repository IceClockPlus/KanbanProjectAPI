const express = require('express');
const router = express.Router();
const { getUsers } = require('./controllers/user-controllers');
const { createBoard, getBoardById, getBoards } = require('./controllers/board-controller');

router.route('/users')
.get(getUsers);

module.exports = router;
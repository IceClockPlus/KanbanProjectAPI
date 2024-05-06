const express = require('express');
const router = express.Router();

const {
    getBoards,
    getBoardById,
    createBoard
} = require('../controllers/board-controller')

router.get('/', getBoards);
router.get('/:id', getBoardById);
router.post('/', createBoard);

module.exports = router;

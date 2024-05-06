const express = require('express');
const router = express.Router();

const {
    getBoards,
    getBoardById,
    createBoard,
    deleteBoard
} = require('../controllers/board-controller')

router.get('/', getBoards);
router.get('/:id', getBoardById);
router.post('/', createBoard);
router.delete('/:id', deleteBoard);

module.exports = router;

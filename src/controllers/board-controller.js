const Board = require('@domain/entities/board.model');
const User = require('@domain/entities/user.model');
const createBoardAsync = require('@features/boards/create-board-command');
var ObjectId = require('mongoose')

const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({});
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

const getBoardById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!ObjectId.isValidObjectId(id)){
            res.status(400).json({message: 'Provided Id is invalid'});
        }

        const board = await Board.findById(id);
        if(!board) {
            return res.status(404).json({ message: 'Board not found'});
        }

        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createBoard = async (req, res) => {
    try {
        const { body, user } = req;
        const createParams = {
            userId: user.userId,
            boardName: body.name
        };

        const response = await createBoardAsync(createParams);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBoard = async (req, res) => {
    try 
    {
        const id = req.params.id;
        const deletedBoard = await Board.findOneAndDelete({_id: id});
        if(!deletedBoard) return res.status(400).json({ message: 'Board not found' });

        return res.status(200).json({ message: 'Board has been deleted'});

    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    deleteBoard
};
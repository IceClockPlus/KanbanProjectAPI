const Board = require('./../domain/entities/board.model');
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

        const board = await Board.find({_id: id});
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createBoard = async (req, res) => {
    try {
       const createdBoard = await Board.create(req.body);
        res.status(200).json(createdBoard);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createBoard,
    getBoards,
    getBoardById
};
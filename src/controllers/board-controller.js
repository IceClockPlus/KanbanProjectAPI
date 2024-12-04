const Board = require('@domain/entities/board.model');
const User = require('@domain/entities/user.model');
const BoardList = require('@domain/entities/list.model');
const registerTaskAsync = require('@features/board-tasks/register-task-command');
var ObjectId = require('mongoose');
const { default: mongoose } = require('mongoose');

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

        const result = await Board.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId.createFromHexString(id),
                }
            },
            {
                $lookup: {
                    from: 'lists',
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'lists'
                }
            }
        ]);

        if(result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Board not found'});
        }
       
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
        const requesterUser = await User.findById(user.userId);
        const newBoard = new Board({
            name: body.name,
            description: body.description,
            users: [
                {
                    _id: requesterUser._id,
                    fullName: `${requesterUser.name} ${requesterUser.lastName}`
                }
            ]
        });
        await newBoard.save();
        const listForNewBoard = [
            {
                name: 'To do',
                boardId: newBoard._id,
                position: 0
            },
            {
                name: 'Working',
                boardId: newBoard._id,
                position: 1
            },
            {
                name: 'Done',
                boardId: newBoard._id,
                position: 2
            }
        ];
        await BoardList.insertMany(listForNewBoard);

        res.status(200).json(newBoard);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const registerTask = async (req, res) => {
    try 
    {
        const { body, user } = req;
        const registerTaskRequest = {
            name: body.name,
            description: body.description,
            storyPoints: body.storyPoints,
            boardId: req.params.id
        };
        const response = await registerTaskAsync(registerTaskRequest)
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
    registerTask,
    getBoards,
    getBoardById,
    deleteBoard
};
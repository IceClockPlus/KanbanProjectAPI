const Board = require('@domain/entities/board.model');
const User = require('@domain/entities/user.model');

const createBoardAsync = async (request) => {
    try {
        const {
            boardName,
            userId
        } = request;
        
        const user = await User.findById(userId);
        const newBoard = new Board({
            name: boardName,
            users: [
                {
                    _id: user._id,
                    name: user.name,
                    lastName: user.lastName
                }
            ]
        });
        await newBoard.save();
        return {
            success: true,
            code: 201,
            message: 'Board succesfully created',
            value: newBoard
        };
    } catch (error) {
        return {
            success: false,
            code: 500,
            message: error.message
        };
    }
};

module.exports.createBoardAsync = createBoardAsync;
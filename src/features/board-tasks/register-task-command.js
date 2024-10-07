const Board = require('@domain/entities/board.model');
const Task = require('@domain/entities/task.model');
const { BoardStageType } = require('@domain/enums/board-enums');
const { default: mongoose } = require('mongoose');

const registerTaskAsync = async (request) => {
    const { name, description, storyPoints, boardId } = request;
    

    const selectedBoard = await Board.findById(boardId).lean();
    if(selectedBoard == null)
    {
        return {
            success: false,
            code: 422,
            message: 'Board not found'
        }
    }
    const firstStage = selectedBoard.stages.find(s => s.type === BoardStageType.Start); 
    
    let taskId = new mongoose.mongo.ObjectId();
    const newTask = new Task({
        _id: taskId,
        name: name,
        description: description,
        storyPoints: storyPoints,
        board: {
            _id: selectedBoard._id,
            name: selectedBoard.name
        },
        stage: {
            _id: firstStage._id,
            name: firstStage.name
        }
    });

    await newTask.save();

    Board.updateOne(
        { _id: boardId },
        {
            $push: {
                'stages.$[elem].tasks': taskId
            }
        },
        {
            arrayFilters: [
                {
                    'elem._id': firstStage._id
                }
            ]
        }
      
    ).then(result => {
        console.log(result);
    });
    return {
        success: true,
        code: 201,
        message: 'Task created',
        value: newTask
    };
};

module.exports = registerTaskAsync;
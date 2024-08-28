const mongoose = require('mongoose');

const taskBoardSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
        name: { type: String, required: true},
    },
    { _id: false }
);

const taskStageSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true},
        name: { type: String, required: true}
    }
)

const taskSchema =  mongoose.Schema(
    {
       name: { type: String, required: true },
       description: { type: String, required: false },
       board: { type: taskBoardSchema, required: false },
       stage: { type: taskStageSchema, required: false },
       storyPoints: { type: Number, required: false }
    }
);


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
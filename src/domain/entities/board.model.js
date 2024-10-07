const mongoose = require('mongoose');
const {UserBoardType, BoardStageType} = require('@domain/enums/board-enums');

const userBoardTypeValues = Object.values(UserBoardType).map(symbol =>symbol.toString());
const boardUserShema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: { type: String, required: true },
        lastName: { type: String, required: true },        
        avatar: { type: String },
        type: { 
            type: String, 
            required: true, 
            enum: userBoardTypeValues,
            default: UserBoardType.Owner
        }
    }, { _id: false }
);

const boardStageSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        maxTasks: { type: Number, required: false, default: null},
        type: {
            type: String,
            required: true,
            enum: BoardStageType,
            default: BoardStageType.Other
        },
        tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
    }
)

const boardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter board name"]
        },
        description: {
            type: String,
            required: false
        },
        users: [boardUserShema],
        stages: [boardStageSchema]
    },
    {
        timestamps: true
    }
);
const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
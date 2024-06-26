const mongoose = require('mongoose');
const {UserBoardType} = require('@domain/enums/board-enums');

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
            default: UserBoardType.Owner.toString()
        }
    }, { _id: false }
);

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
        users: [boardUserShema]
    },
    {
        timestamps: true
    }
);
const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
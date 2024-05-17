const mongoose = require('mongoose');

const boardListSchema = mongoose.Schema(
    {
        
    }
);

const boardUserShema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: { type: String, required: true },
        lastName: { type: String, required: true },        
        avatar: { type: String }
    }, { _id: false }
);

const boardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter board name"]
        },
        users: [boardUserShema]
    },
    {
        timestamps: true
    }
);
const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
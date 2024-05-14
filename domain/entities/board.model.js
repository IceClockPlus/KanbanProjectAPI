const mongoose = require('mongoose');

const boardListSchema = mongoose.Schema(
    {
        
    }
);

const boardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter board name"]
        },
        lists: [
            {
                name: {
                    type: String
                }
            }
        ]
    },
    {
        timestamps: true
    }
);
const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
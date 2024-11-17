const mongoose = require('mongoose');


const issueListSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue'},
    name: { type: String, required: true } 
});

const listSchema = mongoose.Schema({
    name: { type: String},
    maxIssues: { type: Number, required: false},
    boardId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board'
    },
    issues: [issueListSchema]
},{
    timestamps: true
});

const BoardList = mongoose.model("Lists", listSchema);
module.exports = BoardList;
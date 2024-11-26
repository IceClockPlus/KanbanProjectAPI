const mongoose = require('mongoose');

const issueUser = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    fullName: { type: String },
    avatar: { type: String }
});

const issueList = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    name: { type: String }
});

const issueBoard = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    name: { type: String}
});

const issueSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: {
        type: String, required: false,
    },
    storyPoints: {
        type: Number, required: false
    },
    assignedTo: { type: issueUser, required: false},
    board: { type: issueBoard, required: false },
    list: { type: issueList, required: false }

},{
    timestamps: true
});

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
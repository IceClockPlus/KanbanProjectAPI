const Issue = require('@domain/entities/issue.model');
const List = require('@domain/entities/list.model');
const Board = require('@domain/entities/board.model');
const ObjectId = require('mongoose');
const { default: mongoose } = require('mongoose');

const getIssueById = async (req, res) => {
    const id = req.params.id;
    if(!ObjectId.isValidObjectId(id))
        res.status(400).json({message: 'Id not valid'});
    const issue = await Issue.findById(id);
    if(!issue) return res.status(404).json({message: 'Issue not found'});
    
    return res.status(200).json(issue);

};

const createIssue = async (req, res) => {
    try {
        const { body } = req;


        if(body.boardId) {
            const board = await Board.aggregate([
                { $match: {_id: mongoose.Types.ObjectId.createFromHexString(body.boardId)}},
                {
                    $lookup: {
                        from: 'lists',
                        localField: '_id',
                        foreignField: "boardId",
                        as: 'lists'
                    }
                }
            ])[1];
            
        }
        
        const issue = new Issue({
           name: body.name,
           description: body.description,
            storyPoints: body.storyPoints
        });
        await issue.save();
        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
};

module.exports = {
    getIssueById,
    createIssue
};
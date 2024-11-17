const express = require('express');
const router = express.Router();
const { authorize } = require('@middlewares/auth-middleware')

const {
    getIssueById,
    createIssue
} = require('@controllers/issues-controller');

router.get('/:id', getIssueById);
router.post('/', authorize, createIssue);
module.exports = router;
const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const boardRoutes = require('./board-routes');
const issueRoutes = require('./issue-routes');

router.use('/users', userRoutes);
router.use('/boards', boardRoutes);
router.use('/issues', issueRoutes);

module.exports = router;
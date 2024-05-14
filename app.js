require('module-alias/register');
const express = require('express');

const boardRoutes = require('./routes/board-routes');

const mongoose = require('mongoose');
const app = express();
const port = 3000;


app.use(express.json());
app.use('/api/v1/boards', boardRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb://127.0.0.1:27017/KanbanProject')
.then(() => console.log('Connection to MongoDB established'))
.catch(() => console.error('Unexpected error when trying to connect MongoDB'));

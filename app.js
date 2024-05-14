require('module-alias/register');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const boardRoutes = require('./routes/board-routes');
const userRoutes = require('@routes/user-routes');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Kanban Project API",
            version: "1.0.0",
            description: "This is a API documentation"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.js"]

};

const specs = swaggerJsdoc(options);

const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use(express.json());
app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb://127.0.0.1:27017/KanbanProject')
.then(() => console.log('Connection to MongoDB established'))
.catch(() => console.error('Unexpected error when trying to connect MongoDB'));

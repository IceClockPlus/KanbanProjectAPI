require('dotenv').config();
require('module-alias/register');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const boardRoutes = require('@routes/board-routes');
const userRoutes = require('@routes/user-routes');

const errorHadlerMiddleware = require('@middlewares/error-middleware')

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
const port = process.env.PORT || 3000;

app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use(express.json());
app.use(errorHadlerMiddleware);
app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/users', userRoutes);

const dbConnection = process.env.MONGO_DB_CONNECTION || '';

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(process.env.JWT_SECRET);
})

mongoose.connect(dbConnection)
.then(() => console.log('Connection to MongoDB established'))
.catch((err) => console.error('Unexpected error when trying to connect MongoDB', err));

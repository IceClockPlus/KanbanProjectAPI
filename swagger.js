const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const listEndpoints = require('express-list-endpoints');
const schemas = require('./swagger/schemas');
const app = require('./app');

const doc = {
    info: {
        title: 'Trello Clone API',
        description: 'API documentation for Trello Clone project',
    },
    basePath: '/api',
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        LoginUserRequest:{
            email: 'example@email.com',
            password: 'password123',
        },
        RegisterUserRequest:{
            name: 'John',
            lastName: 'Doe',
            email: 'sample@email.com',
            password: 'password123',
        },
        RegisterUserResponse:{
            name: 'John',
            lastName: 'Doe',
            email: 'sample@email.com'
        }
    },
    components: {
        schemas: schemas,
    },
    tags: [
        {
            name: 'Users',
            description: 'User related endpoints',
        },
        {
            name: 'Boards',
            description: 'Board related endpoints',
        },
        {
            name: 'Issues',
            description: 'Issue related endpoints',
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
}

const foundEndpointsList = listEndpoints(app).map((route) => `./src/routes/${route.path}}`);



const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);
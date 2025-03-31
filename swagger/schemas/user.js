const e = require("express");
const req = require("express/lib/request");

module.exports = {
    LoginUserRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string',
                description: 'User email',
                example: 'sample@email.com'
            },
            password: {
                type: 'string',
                description: 'User password',
                example: 'password123',
            },
        },
    },
    LoginUserResponse: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: 'JWT token',
                example: 'JWT_TOKEN',
            },
            success: {
                type: 'boolean',
                description: 'Authentication success',
                example: true,
            }
        }
    },
    RegisterUserRequest: {
        type: 'object',
        required: ['name', 'lastName', 'email', 'password'],
        properties:{
            name: {
                type: 'string',
                description: 'User first name',
                example: 'John',
            },
            lastName: {
                type: 'string',
                description: 'User last name',
                example: 'Doe',
            },
            email: {
                type: 'string',
                description: 'User email',
                example: 'sample@email.com'
            },
            password: {
                type: 'string',
                description: 'User password',
            },
        }
    },
    RegisterUserResponse:
    {
        type: 'object',
        properties:{
            name: {
                type: 'string',
                description: 'Created user name',
                example: 'John',
            },
            lastName: {
                type: 'string',
                description: 'Created user last name',
                example: 'Doe',
            },
            email: {
                type: 'string',
                description: 'Created user email',
                example: 'sample@email.com'
            },
        }
    }
}
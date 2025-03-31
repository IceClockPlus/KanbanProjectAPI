const express = require('express');
const router = express.Router();

const {
 registerNewUser,
 authenticateUser,
 getMyInfo
} = require('@controllers/user-controllers');

const { authorize } = require('@middlewares/auth-middleware')

router.post('/', (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Register a new user'
    // #swagger.description = 'Returns the info of the created user'
    /*  #swagger.requestBody = {
            required: true,
            description: 'Add new user.',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/RegisterUserRequest' }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'User created successfully',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/RegisterUserResponse' }
                }
            }
        }
    */
    registerNewUser(req, res);
});
router.post('/login', (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Authenticate user'
    // #swagger.description = 'Returns the authentication token (JWT) to access to other functions'
    /*  #swagger.requestBody = {
            required: true,
            description: 'Add new user.',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/LoginUserRequest' }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'User created successfully',
            content: {
                'application/json': {
                    schema: { $ref: '#/components/schemas/LoginUserResponse' }
                }
            }            
        }
    */
    authenticateUser(req, res);
});
router.get('/myInfo', authorize, getMyInfo);
module.exports = router;